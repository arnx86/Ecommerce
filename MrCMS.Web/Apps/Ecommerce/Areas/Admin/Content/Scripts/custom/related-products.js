$(function () {
    $('button#close').click(function () {
        parent.$.featherlight.close();
        return false;
    });
    $('form.form-update-form input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('.submit-form-btn').click();
        }
    });

    $(document).on('click', '#products .add-product', function () {
        var term = $('#searchparam').val();
        var button = $(this),
            parentProductId = button.data('parent-product-id'),
            productId = button.data('product-id');
        $.post('/Admin/Apps/Ecommerce/Product/AddRelatedProduct/',
            { id: parentProductId, relatedProductId: productId },
            function (response) {
                parent.$.get('/Admin/Apps/Ecommerce/Product/RelatedProducts/' + parentProductId, function (products) {
                    parent.$('#related-products').replaceWith(products);
                });
                var href = '/Admin/Apps/Ecommerce/Product/AddRelatedProductItems/' + parentProductId + '?page=1&query=' + term;
                $('.modal-body-container').load(href + ' div#products', function () {
                });
            });
        return false;
    });

    $('#search').click(function (e) {
        e.preventDefault();

        var term = $("#searchparam").val();
        var productId = $("#productId").val();
        if (term !== "" && productId != "" && productId != null) {
            $.get('/Admin/Apps/Ecommerce/Product/AddRelatedProductItems/' + productId + '?page=1&query=' + term, function (response) {
                $('.modal-body-container').html(response);
            });
        }
    });
})

