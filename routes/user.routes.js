import { Router } from "express";
import { checkforupdate, checkdataforregister, checkforlogin ,checkProduct} from "../midllewares/middleware.js";
import {registeruser,loginuser,updateProduct, deleteproductbyId, getproductbyid, getAllproducts,Createproduct} from '../controllers/index.js'
export const userrouter=Router()

userrouter.post("/register",checkdataforregister,registeruser)
userrouter.post("/login",checkforlogin,loginuser)
userrouter.get("/product",getAllproducts)
userrouter.get("/product/:id",getproductbyid)
userrouter.delete("/product/:id",deleteproductbyId)
userrouter.put("/product",checkforupdate,updateProduct)
userrouter.post("/product/add",checkProduct,Createproduct)