// 加入站點
const url = 'https:///vue3-course-api.hexschool.io';
// 加入個人 API Path
const path = 'kevinapog47138';

const app = {
  data: {
    products: [],
  },
  // 取得商品列表資料方法
  getData() {
    axios
      .get(`${url}/api/${path}/products`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          this.data.products = res.data.products;
          // console.log(this.data.products);
          this.render();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 刪除產品方法
  deleteProduct(evt) {
    // console.log('觸發刪除事件');
    // 事件物件
    const id = evt.target.dataset.id;
    // console.log(evt, id);
    axios
      .delete(`${url}/api/${path}/admin/product/${id}`)
      .then((res) => {
        // console.log(res);
        // 因為是在deleteBtns DOM元素內，this指向會有問題，所以不能寫this.render()
        app.getData();
        swal('成功!', '資料刪除成功', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 渲染資料方法
  render() {
    const productsListDom = document.querySelector('#productList');
    let str = '';
    this.data.products.forEach((item) => {
      str += `
      <tr>
        <td>${item.title}</td>
        <td width="120">${item.origin_price}</td>
        <td width="120">${item.price}</td>
        <td width="100"><div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id=" ${item.id}" ${
        item.is_enabled ? 'checked' : ''
      } data-action="complete" data-id="${item.id}">
        <label class="form-check-label" for="is_enabled">${
          item.is_enabled ? '啟用' : '未啟用'
        }</label>
      </div></td>
        <td width="120"><button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${
          item.id
        }"> 刪除 </button></td>
      </tr>
      `;
    });
    // console.log(str);
    productsListDom.innerHTML = str;

    // 刪除按鈕監聽
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    // console.log(deleteBtns);
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', this.deleteProduct);
    });
  },
  init() {
    // 取出cookie
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    // console.log(token);

    // 驗證是否登入
    // axios.post(`${url}/api/user/check`).then((res) => {
    //   console.log(res);
    // });

    // 取得商品列表資料
    this.getData();
  },
};
app.init();
