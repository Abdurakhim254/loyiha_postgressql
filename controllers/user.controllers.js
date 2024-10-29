import {createUser,getData,check_id,getproductbyId,CreateProduct,deleteproductbyid,getallinfo,getId, updateProductById,Creatalocation, fillorders_table} from '../db/functions.js'
import { basicAuthmid } from '../midllewares/middleware.js'


export const registeruser=async(req,res)=>{
    try {
        const {ism,familya,tel,email,parol,joylashuv_id,yashash_manzili}=req.body
        const user=await createUser(ism,familya,tel,email,parol)
        const data=await Creatalocation(joylashuv_id,yashash_manzili)
        res.status(200).send({"Profile Malumoti":user,'Location':data})
    } catch (error) {
        res.status(400).send(error.message)
    }
}


export const loginuser=async(req,res)=>{
    try {
        const {email,parol}=req.body
        const data=await getData(email,parol)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Foydalanuvchi topilmadi")
    }
}


export const getproductbyid=async(req,res)=>{
    try {
        const id=+req.params.id
        const data= await getproductbyId(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Ma'lumot topilmadi")
    }

}


export const getAllproducts=async(req,res)=>{
    try {
        const data=await getallinfo()
        res.status(200).send(data)
    } catch (error) {
        res.status(200).send("Xatolik")
    }
}


export const updateProduct=async(req,res)=>{
    try {
        const {product_name,product_narxi,product_count}=req.body
        const {login,password}=basicAuthmid(req)
        const getid=await getId(login,password)
        console.log(getid)
        const data=await updateProductById(getid,product_name,product_narxi,product_count)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Product yangilanmadi")
    }
}


export const deleteproductbyId=async(req,res)=>{
    try {
        const id=+req.params.id
        const data=await deleteproductbyid(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send("Ma'lumot O'chirilmadi")
    }
}


export const Createproduct=async(req,res)=>{
    try {
        const {product_id,buyurtma_id,product_name,product_narxi,product_count}=req.body
        const check=await check_id(product_id)
        if(check){
            const product=await CreateProduct(product_id,buyurtma_id,product_name,product_narxi,product_count)
            const order=await fillorders_table(buyurtma_id,product_narxi)       
            res.status(200).send({'Product info':product,'Order info':order})
        }else{
            res.status(400).send("Ro'yxatdan o'tishingiz kerak")
        }
    } catch (error) {
        res.status(400).send("Product yaratilmadi")
    }
}