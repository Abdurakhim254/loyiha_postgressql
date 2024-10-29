import pg from'pg'

const client=new pg.Client({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    port: 5432,
    database: 'uzum_biznes'
})
await client.connect()

export const createUser=async(ism,familya,tel,email,parol)=>{
    const query="Insert into foydalanuvchi(ism,familya,tel,email,parol) Values($1,$2,$3,$4,$5)"
    await client.query(query,[ism,familya,tel,email,parol])
    return 'Foydalanuvchi yaratildi' 
}

export const getData=async(email,parol)=>{
    const query='Select * from foydalanuvchi where email=$1 and parol=$2'
    const data=await client.query(query,[email,parol])
    if(data.rows.length!=1){
        return "Ro'yxatdan o'tishingiz kerak"
    }
    return "Ro'yxatdan o'tgansiz"
}
export const getallinfo=async()=>{
    const data=await client.query("Select * from products")
    return data.rows
}

export const getproductbyId=async(id)=>{
    const data=await client.query("Select * from products where product_id=$1",[id])
    if(data.rows.length!=1){
        return "Ma'lumot topilmadi"
    }
    return data.rows
}
export const getId=async(login,password)=>{
    const query='Select id from foydalanuvchi where email=$1 and parol=$2'
    const data=await client.query(query,[login,String(password)])
    if(data.rows.length!=1){
        return "Malumotni yangilab bo'lmaydi"
    }
    return data.rows
}
export const updateProductById=async(id,product_name,product_narxi,product_count)=>{
    const query='Update from products Set product_name=$1,product_narxi=$2,product_count=$3 where product_id=$4'
    const data=await client.query(query,[product_name,product_narxi,product_count,id])
    return 'Product yangilandi'
}
export const deleteproductbyid=async(id)=>{
    const data=await client.query("Delete from products where product_id=$1",[id])
    return "Ma'lumot O'chirildi"
}

export const Creatalocation=async(joylashuv_id,yashash_manzili)=>{
    const query='Insert into joylashuv(joylashuv_id,yashash_manzili) Values($1,$2)'
    const data=await client.query(query,[joylashuv_id,yashash_manzili])
    return "Ma'lumot yozildi"
}
export const check_id=async(product_id)=>{
    const query="Select * from foydalanuvchi where id=$1"
    const data=await client.query(query,[product_id])
    if(data.rows.length!=1){
        return false
    }
    return true
}
export const fillorders_table=async(buyurtma_id,product_narxi)=>{
    const query='Insert into buyurtmalar(buyurtma_id,buyurtma_narxi) Values($1,$2)'
    const data=await client.query(query,[buyurtma_id,product_narxi])
    return "Order tablega ma'lumot qo'shildi"
}


export const CreateProduct=async(product_id,buyurtma_id,product_name,product_narxi,product_count)=>{
    const query="Insert into products(product_id,buyurtma_id,product_name,product_narxi,product_count) Values($1,$2,$3,$4,$5)"
    const data=await client.query(query,[product_id,buyurtma_id,product_name,product_narxi,product_count])
    return 'Product yaratilidi'
}
// const opros='INSERT INTO fillials (joylashgan_joyi) VALUES($1)'
// let arr=['Yunusobod 2-tor kochasi',
// 'Chilonzor 3-mavze',
// 'Mirobod 5-kocha',
// 'Yakkasaroy 7-tor kochasi',
// 'Uchtepa 9-kocha',
// 'Olmazor 11-tor kochasi',
// 'Shayxontohur 15-mavze',
// 'Bektemir 2-tor kochasi',
// 'Mirzo Ulug\'bek 18-kocha',
// 'Sergeli 4-mavze']
// for (const iterator of arr) {
//     await client.query(opros,[iterator])
// }
// const data=await client.query("Select * from fillials") 
// console.log(data.rows)   