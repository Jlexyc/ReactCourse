const productsMock = [
    { id: 0, name: 'Car', description: 'Good Toy for Boys', categoryId: 1, price: 100 },
    { id: 1, name: 'Robot', description: 'Good Toy for Boys', categoryId: 1, price: 600 },
    { id: 2, name: 'Doll', description: 'Good Toy for Girls', categoryId: 0, price: 300 },
    { id: 3, name: 'Lego', description: 'Good Toy for Everyone', categoryId: 2, price: 500 },
]

const transactionsMock = [
    {
        id: 0,
        date: Date.now() - 10000,
        user: 'Me',
        type: 'in',
        items: [
            { 
                productId: 2,
                quantity: 2
            },
            { 
                productId: 3,
                quantity: 5
            },
            { 
                productId: 0,
                quantity: 10,
            }
        ]
    },
    {
        id: 1,
        date: Date.now() - 800,
        user: 'Me',
        type: 'out',
        items: [
            { 
                productId: 2,
                quantity: 5
            },
            { 
                productId: 3,
                quantity: 7
            }
        ]
    },
    {
        id: 1,
        date: Date.now() - 14000,
        user: 'Jane',
        type: 'in',
        items: [
            { 
                productId: 1,
                quantity: 9
            },
            { 
                productId: 2,
                quantity: 5
            },
            { 
                productId: 3,
                quantity: 7
            }
        ]
    },
    {
        id: 1,
        date: Date.now() - 18000,
        user: 'Me',
        type: 'out',
        items: [
            { 
                productId: 2,
                quantity: 5
            },
            { 
                productId: 3,
                quantity: 7
            }
        ]
    }
]

export const getProducts = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const token = getState().auth.token

    if (!token) {
        dispatch({
            type: 'getProducts',
            subtype: 'failed',
            error: { message: 'Bad Token' }
        })
        reject()
    }

    dispatch({
        type: 'getProducts',
        subtype: 'loading'
    })


    setTimeout(() => {
        
        const updatedProducts = productsMock.map(product => {
            const localTransactions = transactionsMock.filter((e) => {
                return e.items.find(item => item.productId === product.id)
            })
            const mappedTransactions = localTransactions.map(trans => {
                const currentItem = trans.items.find(item => item.productId === product.id)
                return {
                    ...trans,
                    currentItem
                }
            })

            return {
                ...product,
                transactions: mappedTransactions
            }
        })

        dispatch({
            type: 'getProducts',
            subtype: 'success',
            products: updatedProducts,
            transactions: transactionsMock
        })
        resolve()
    }, 2000)
})