const express = require("express"); //module để khởi tạo server
const dotenv = require('dotenv');  // module để config   
const mongoose  = require("mongoose");// module để truy cập vào mongodb
const routes = require("./routes");// module để truy cập tài nguyên của thư mục routes
const bodyParser = require("body-parser");//module để phân tích và xử lý dữ liệu của gửi từ client đến server
dotenv.config()

const app = express() //hàm tạo 1 ứng dụng Express mới
const port = process.env.PORT || 3001 //biến xác định cổng mà máy chủ sẽ lắng nghe yêu cầu từ phía người dùng
app.use(bodyParser.json())

routes(app);


mongoose.connect('mongodb+srv://minhquang:Khongthepha18@cluster0.2uqnoxy.mongodb.net/')
    .then(()=>{
        console.log('Connect Db success!')
    })
    .catch((err)=>{
    console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})