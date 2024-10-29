//THÔNG BÁO
var alertFunc = (content = null, time = 3000, type = "alert--success") =>{
    if(content){
        const newAlert = document.createElement("div");
        
        newAlert.setAttribute("class",`alert ${type}`);
        newAlert.innerHTML = `
            <div class="alert-content">${content}</div>
            <div class="alert-close"><i class="fa-solid fa-xmark"></i></div>
        `
        var listAlert = document.querySelector(".list-alert");
        console.log(listAlert);
        if(listAlert){
            listAlert.appendChild(newAlert);
        
            const alertClose = newAlert.querySelector(".alert-close");
            alertClose.addEventListener("click", () => {
                listAlert.removeChild(newAlert);
            })
            setTimeout(()=>{
                listAlert.removeChild(newAlert);  
            },time); 
        }
        
    }

}

axios.get("http://localhost:3000/books")
.then(res => {
    const data = res.data;
    let html ="";
    for (const book of data) {
        html += `
        <tr book-id = ${book.id}>
                    <td>${book.title}</td>
                    <td>${book.price.toLocaleString()}</td>
                    <td>${book.author}</td>
                    <td>
                        <button class="button button--edit">Sửa</button>
                        <button class="button button--delete">Xóa</button>
                    </td>
                </tr>
        `
        
    }
    const tableBook = document.querySelector("table tbody");
    if(tableBook){
        tableBook.innerHTML = html;
    }

})

const formCreate = document.querySelector("#form-create");
if(formCreate){
    formCreate.addEventListener("submit", (event) => {
        event.preventDefault();
        nameFormCreate = formCreate.title.value;
        priceFormCreate = formCreate.price.value;
        authorFormCreate = formCreate.author.value;
        if(!nameFormCreate){
            alertFunc("Vui lòng nhập tiêu đề",3000,"alert--error")
            return;
        }
        if(!priceFormCreate){
            alertFunc("Vui lòng nhập giá",3000,"alert--error")
            return;
        }
        if(!authorFormCreate){
            alertFunc("Vui lòng nhập tên tác giả",3000,"alert--error")
            return;
        }
        const data = {
            title: nameFormCreate,
            price: parseInt(priceFormCreate),
            author: authorFormCreate
        };
        axios.post("http://localhost:3000/books",data)
        .then(res => {
            //cach 1: form trang va in ra thong bao
            alertFunc("Thêm mới thành công");
            formCreate.reset();
            //cach 2 chuyen ve trang danh sach san pham
            // window.location.href = "index.html";
        })
        
    })
}

//chỉnh sửa

// const formEdit = document.querySelector("#form-edit");
// if(formEdit){
//     formCreate.addEventListener("submit", (event) => {
//        event.preventDefault();
//         nameFormCreate = formCreate.title.value;
//         priceFormCreate = formCreate.price.value;
//         authorFormCreate = formCreate.author.value;
//         if(!nameFormCreate){
//             alertFunc("Vui lòng nhập tiêu đề",3000,"alert--error")
//             return;
//         }
//         if(!priceFormCreate){
//             alertFunc("Vui lòng nhập giá",3000,"alert--error")
//             return;
//         }
//         if(!authorFormCreate){
//             alertFunc("Vui lòng nhập tên tác giả",3000,"alert--error")
//             return;
//         }
//         const data = {
//             title: nameFormCreate,
//             price: parseInt(priceFormCreate),
//             author: authorFormCreate
//         };
//         axios.post("http://localhost:3000/books",data)
//         .then(res => {
//             //cach 1: form trang va in ra thong bao
//             alertFunc("Thêm mới thành công");
//             formCreate.reset();
//             //cach 2 chuyen ve trang danh sach san pham
//             // window.location.href = "index.html";
//         })
        
//     })
// }

