class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {  
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Nombre producto</strong>: ${product.name}
                <strong>Precio producto</strong>: ${product.price}
                <strong>Año producto</strong>: ${product.year}
                <a href="#" class="btn btn-danger delete">Eliminar</a>
            </div>
        </div>
        `;
        productList.appendChild(element);
    }
     
    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) { 
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado exitosamente', 'danger');
        }
    }
    
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

document.getElementById('product-form').addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();

    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Complete los campos por favor', 'danger');
    }
    ui.addProduct(product);  
    ui.resetForm();
    ui.showMessage('Producto agregado exitosamente', 'success');
    e.preventDefault();
});
    
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});