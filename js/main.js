const ProductName = document.getElementById('ProductName');
const ProductCategory = document.getElementById('ProductCategory');
const ProductPrice = document.getElementById('ProductPrice');
const ProductDescription = document.getElementById('ProductDescription');
const tableRow = document.getElementById('tableRow');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const searchInput = document.getElementById('searchInput');
const storageKey = 'productStorage';
let productList = loadProducts();
let editingIndex = null;

function loadProducts() {
    try {
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
        return [];
    }
}

function saveProducts() {
    localStorage.setItem(storageKey, JSON.stringify(productList));
}

function readForm() {
    return {
        ProductName: ProductName.value.trim(),
        ProductCategory: ProductCategory.value.trim(),
        ProductPrice: ProductPrice.value.trim(),
        ProductDescription: ProductDescription.value.trim()
    };
}

function clearForm() {
    document.querySelector('.info').reset?.();
    ProductName.value = '';
    ProductCategory.value = '';
    ProductPrice.value = '';
    ProductDescription.value = '';
    editingIndex = null;
    btn1.textContent = 'Add Product';
}

function addOrUpdateProduct() {
    if (!ProductName.value.trim() || !ProductCategory.value.trim() || !ProductPrice.value || Number(ProductPrice.value) < 0) {
        alert('Enter a product name, category, and a valid non-negative price.');
        return;
    }

    const product = readForm();
    if (editingIndex === null) productList.push(product);
    else productList[editingIndex] = product;

    saveProducts();
    clearForm();
    displayProducts();
}

function displayProducts() {
    const term = searchInput.value.trim().toLocaleLowerCase();
    const filteredProducts = productList
        .map((product, index) => ({ product, index }))
        .filter(({ product }) => product.ProductName.toLocaleLowerCase().includes(term));

    tableRow.replaceChildren();
    filteredProducts.forEach(({ product, index }) => {
        const row = document.createElement('tr');
        [index + 1, product.ProductName, product.ProductPrice, product.ProductCategory, product.ProductDescription]
            .forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value ?? '';
                row.appendChild(cell);
            });

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn';
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteProduct(index));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        const updateCell = document.createElement('td');
        const updateButton = document.createElement('button');
        updateButton.className = 'btn';
        updateButton.type = 'button';
        updateButton.textContent = 'Update';
        updateButton.addEventListener('click', () => editProduct(index));
        updateCell.appendChild(updateButton);
        row.appendChild(updateCell);
        tableRow.appendChild(row);
    });
}

function deleteProduct(index) {
    productList.splice(index, 1);
    saveProducts();
    displayProducts();
}

function editProduct(index) {
    const product = productList[index];
    ProductName.value = product.ProductName;
    ProductCategory.value = product.ProductCategory;
    ProductPrice.value = product.ProductPrice;
    ProductDescription.value = product.ProductDescription;
    editingIndex = index;
    btn1.textContent = 'Update Product';
    ProductName.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

btn1.addEventListener('click', addOrUpdateProduct);
btn2.addEventListener('click', clearForm);
searchInput.addEventListener('input', displayProducts);
displayProducts();
