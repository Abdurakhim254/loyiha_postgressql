import pg from'pg'

const client=new pg.Client({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    port: 5432,
    database: 'postgres'
})
await client.connect()
const query="Create database uzum_biznes"
await client.query(query)
console.log("Uzum biznes is created")
await client.end()

const newclient=new pg.Client({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    port: 5432,
    database: 'uzum_biznes'
})
await newclient.connect()
const newquery=[
    `CREATE TABLE IF NOT EXISTS fillials (
        id SERIAL PRIMARY KEY,
        joylashgan_joyi VARCHAR(50)
    )`,

    `CREATE TABLE IF NOT EXISTS foydalanuvchi (
        id SERIAL PRIMARY KEY,
        ism VARCHAR(25),
        familya VARCHAR(25),
        tel INT,
        email VARCHAR(25),
        parol VARCHAR(25)
    )`,

    `CREATE TABLE IF NOT EXISTS joylashuv (
        joylashuv_id INT PRIMARY KEY,
        FOREIGN KEY (joylashuv_id) REFERENCES foydalanuvchi(id) ON DELETE CASCADE,
        yashash_manzili VARCHAR(50)
    )`,

    `CREATE TABLE IF NOT EXISTS buyurtmalar (
        malumot_id SERIAL PRIMARY KEY,
        buyurtma_id INT,
        FOREIGN KEY (buyurtma_id) REFERENCES foydalanuvchi(id),
        buyurtma_narxi INT
    )`,

    `CREATE TABLE IF NOT EXISTS products (
        product_id INT PRIMARY KEY,
        FOREIGN KEY (product_id) REFERENCES foydalanuvchi(id),
        buyurtma_id INT,
        FOREIGN KEY (buyurtma_id) REFERENCES buyurtmalar(malumot_id) ON DELETE CASCADE,
        product_name VARCHAR(50),
        product_narxi INT,
        product_count INT
    )`
]


for (const iterator of newquery) {
    await newclient.query(iterator)
}
console.log("Table created")
await newclient.end()


