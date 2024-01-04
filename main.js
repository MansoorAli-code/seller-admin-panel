const BASE_URL = 'https://crudcrud.com/api/985d86728b9f44aeb14a6fbab7c80f41/products';

function fetchProducts() {
  axios.get(BASE_URL)
    .then(response => {
      const products = response.data;
      const productListDiv = document.getElementById('productList');
      productListDiv.innerHTML = '';

      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
          <p>${product.productName} - ${product.productPrice}</p>
          <button onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productListDiv.appendChild(productDiv);
      });

      updateTotalStockValue(products);
    })
    .catch(error => console.error('Error fetching products:', error));
}

function addProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;

  if (productName && productPrice) {
    const newProduct = { productName, productPrice };
    axios.post(BASE_URL, newProduct)
      .then(() => {
        fetchProducts();
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
      })
      .catch(error => console.error('Error adding product:', error));
  } else {
    alert('Please fill in all fields');
  }
}

function deleteProduct(productId) {
  axios.delete(`${BASE_URL}/${productId}`)
    .then(() => {
      fetchProducts();
    })
    .catch(error => console.error('Error deleting product:', error));
}

function updateTotalStockValue(products) {
  const totalStockValue = products.reduce((acc, product) => acc + parseFloat(product.productPrice), 0);
  document.getElementById('totalStockValue').textContent = totalStockValue;
}

// Initial fetch on page load
fetchProducts();
