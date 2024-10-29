export const basicAuthmid = (req) => {
    try {
        const b64auth = (req.headers.authorization || "").split(" ")[1] || ""
        const strauth = Buffer.from(b64auth, "base64").toString()
        const splitindex = strauth.indexOf(":")
        const login = strauth.substring(0, splitindex)
        const password = strauth.substring(splitindex + 1)
        // const ismatch=login=='Abduraxim'
        // const ismatchlogin=password=='121231@@'
        console.log(login,password)
        return {login, password}
    } catch (error) {
        return res.status(400).send(error.message)
    }

}
export const checkdataforregister=(req,res,next)=>{
   
        try {
            const {ism,familya,tel,email,parol,joylashuv_id,yashash_manzili}=req.body
            if(!email || !parol || !ism || !familya || !yashash_manzili){
                throw new Error("Malumot to'liqmas")
            }
            if(!joylashuv_id>0){
                throw new Error("Malumot to'liqmas")
            }
            if(!tel>0){
                throw new Error("Malumot to'liqmas")
            }
            next()
        } catch (error) {
            res.status(400).send("Malumotlar to'liqmas")
        }
   
}

export const checkforlogin=(req,res,next)=>{
    try {
        const {email,parol}=req.body
        if(!email || !parol ){
            throw new Error("Malumotlar to'liqmas")
        }
        next()
    } catch (error) {
        return res.status(400).send("Malumotlar to'liqmas")
    }
}
export const checkforupdate=(req,res,next)=>{
    try {
        const {product_name,product_narxi,product_count}=req.body
        if(!product_name){
            throw new Error("Malumotlar to'liqmas")
        }
        if(!(product_narxi>0)||!(product_count>0)){
            throw new Error("Malumotlar to'liqmas")
        }
        next()
    } catch (error) {
        return res.status(400).send("Xatolik")
    }
}
export const checkProduct=(req,res,next)=>{
    try {
        const {product_id,buyurtma_id,product_name,product_narxi,product_count}=req.body
        if(!(product_narxi>0)||!(product_count>0)||!(product_id>0)||!(buyurtma_id>0)){
            throw new Error("Malumotni qo'shib bolmaydi")
        }
        if(!product_name){
            throw new Error("Malumotni qo'shib bolmaydi")
        }
        next()
    } catch (error) {
        return res.status(400).send("Malumotni qo'shib bolmaydi")
    }
}