/////////////////////Tinh Tien////////////////////////
$('#soluong').on('change', function() {

    TinhTien();
});


function TinhTien() {
    var soluong = 0;
    var giatien = 0;
    if ($('#soluong') != null) {
        soluong = $('#soluong').val();
    }


    if ($('#dongia') != null) {
        giatien = $('#dongia').val();
    }
    var tt = soluong * giatien;
    $('#thanhtien').val(tt);
}

$(document).ready(function() {
    $.ajax({
        url: 'http://45.118.145.91:9999/pos/api/product/detail?shop_token=AmlWspRNhvjO7z4iPD0eWekLLUeODOYt&warehouseId=1&productID=2',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var objProduct = data.body;
            // alert(objProduct.name);
            var lstImages = objProduct.images;
            var Name_product = objProduct.name;
            var titles = objProduct.desc;
            var Pricess = objProduct.originPrice;
            var Pri = objProduct.variants;
            var Pric = Pri[0].price;
            var Property = Pri[0].properties;
            var AllCategoriess = objProduct.categories;
            var videotest;
            var Khuyenmai1;
            var Khuyenmai2;
            ////Set đơn giá

            for (var i = 0; i < objProduct.categories.length; i++) {
                // alert(objProduct.categories[i]);
                $("#categories").val(objProduct.categories[i]);
                $("#categories").append(`${objProduct.categories[i]}`);
            }

            $('#color' && '#size').on('change', function() {
                    for (var k = 0; k < Pri.length; k++) {
                        for (var j = 0; j < Property.length; j++) {
                            for (var i = 0; i < Property.length; i++) {
                                if (Pri[k].properties[j].key === "Màu" && $('#color').val() === Pri[k].properties[j].val && Pri[k].properties[i].key === "Size" && Pri[k].properties[i].val === $('#size').val()) {
                                    var dongia = Pri[k].price;
                                    $('#dongia').empty();
                                    $('#dongia').val(dongia);
                                    $("#ProductId").empty();
                                    $("#ProductId").val(objProduct.id);
                                    $("#ProductId").append(`${objProduct.id}`);
                                    $("#VariantId").empty();
                                    $("#VariantId").val(Pri[k].id);
                                    $("#VariantId").append(`${Pri[k].id}`);
                                    $("#Quantity").empty();
                                    $("#Quantity").val(Pri[k].quantity);
                                    $("#Quantity").append(`${Pri[k].quantity}`);
                                    $("#Weight").empty();
                                    $("#Weight").val(Pri[k].weight);
                                    $("#Weight").append(`${Pri[k].weight}`);
                                    $("#Price").empty();
                                    $("#Price").val(Pri[k].price);
                                    $("#Price").append(`${Pri[k].price}`);
                                    $("#Money").empty();
                                    $("#Money").val(Pri[k].price);
                                    $("#Money").append(`${Pri[k].price}`);
                                    //alert(typeof parseInt($('#weight').val()));
                                }
                            }
                        }
                    }
                })
                ////Thêm khuyến mãi
            if (Khuyenmai1 != null) {
                $('.promotion').append(`
                <h2 style="font-size: 1.5em;">Ưu đãi siêu hấp dẫn</h2>
                <hr style="height: 1px; background-color: black;">
                <p>${Khuyenmai1}</p>
                <p>${Khuyenmai2}</p>
            `)
            }

            //////Set màu và size
            for (var k = 0; k < Pri.length; k++) {
                for (var j = 0; j < Pri[0].properties.length; j++) {
                    if (Pri[k].properties[j].key === "Size") {
                        $("#size").append(`
                           <option>${Pri[k].properties[j].val}</option>
                    `);
                    } else if (Pri[k].properties[j].key === "Màu") {
                        $("#color").append(`
                        <option>${Pri[k].properties[j].val}</option>
                    `);
                    }

                }
                // var dongia = Pri[k].price;
                // $('#dongia').val(dongia);
            }
            for (var j = 0; j < 3; j++) {
                $(".product-name-ref").append(`		
                        <img src="http://45.118.145.91:9999${lstImages[j]}">
                    `);
            }
            ////////Tên sản phẩm
            $("#Name-product").val(Name_product);
            $("#Name-product").append(`	
                <span class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10" style="text-align:center;">
                <b>${Name_product}</b> 
                </span>
                <div class="sale-off ">
                    <div class="frame-top" style="background-color: yellow;padding: 2px 2px;height: 60px;width: 100%; ">
                        <div class="text">Giảm</div>
                        <div class="values"></div>
                    </div>
                    <div class="frame-bottom " style="display: flex; width: 100%;">
                        <div class="bottom-left" style=" width: 0;
                    height: 0;
                    border-top: 23px solid yellow;
                    border-right: 23px solid transparent;"></div>
                        <div class=" bottom-right " style=" width: 0;
                    height: 0;
                    border-top: 23px solid yellow;
                    border-left: 23px solid transparent;"></div>
                    </div>
                </div>
            `);
            /////Tiêu đề sản phẩm
            $("#description").append(`		
                
                <p>${titles}</p>
            `);
            /////// giá gốc
            $(".price-promotion").append(`		
               ${Pricess}
            `);
            //////Gía khuyến mãi
            $(".price-const").append(`		
               ${Pric}
            `);
            /// thông tin chi tiết sản phẩm

            ////////Thêm mô tả bằng video
            if (videotest != null) {
                $("#videoinfo").append(`
            
                    <h2>Video mô tả thêm về sản phẩm</h2>
                    <hr style="height: 1px; background-color: black;">
                    <video controls>
                        <source src="${videotest}" type="video/mp4">
                        <source src="${videotest}" type="video/ogg">
                    </video>
                `);
            }

        }
    });

});

///////Set up tỉnh thành quận huyện phường xã
$(document).ready(function() {
    $.ajax({
        url: 'http://45.118.145.91:9999/pos/api/province',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var general = data.body;
            for (var i = 0; i < general.length; i++) {
                $('#tinhthanh').append(`
                    <option  value="${general[i].id}">${general[i].name}</option>
                `)
            }
        }

    })

});

$('#tinhthanh').on('change', function() {
    // alert(general[j].id);
    var link = "http://45.118.145.91:9999/pos/api/district/" + $('#tinhthanh').find(":selected").val();
    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#quanhuyen').empty();
            var quanhuyens = data.body;
            for (var k = 0; k < quanhuyens.length; k++) {
                for (var f = k; f < quanhuyens.length; k++) {
                    $('#quanhuyen').append(`
                        <option value="${quanhuyens[k].id}">${quanhuyens[k].name}</option>
                    `)
                }
            }
        }
    })
});
$('#color' && '#size' && '#soluong').on('change', function() {
    console.log('ID PRODUCT:' + $('#ProductId').val());
});
$('#quanhuyen').on('change', function() {
    var link2 = "http://45.118.145.91:9999/pos/api/ward/" + $('#quanhuyen').find(":selected").val();
    $.ajax({
        url: link2,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#xaphuong').empty();
            var xaphuong = data.body;
            for (var n = 0; n < xaphuong.length; n++) {
                $('#xaphuong').append(`
                            <option value="${xaphuong[n].id}">${xaphuong[n].name}</option>
                `)
            }
        }
    })
});

$('.submit').on('click', function() {
    var invoice = {
        "shopId": 1,
        "warehouseId": 1,
        "orderChannel": "LANDINGPAGE",
        "totalMoney": $('#thanhtien').val(),
        "paidMoney": "0",
        "discountPercent": "0",
        "discountMoney": "0",
        "cashMoney": $('#thanhtien').val(),
        "customerName": $('.name').val(),
        "customerPhone": $('.phone-number').val(),
        "receiverName": $('.name').val(),
        "receiverPhone": $('.phone-number').val(),
        "receiverAddress": $('.diachi').val(),
        "receiverProvince": $('#tinhthanh').find(":selected").val(),
        "receiverDistrict": $('#quanhuyen').find(":selected").val(),
        "receiverWard": $('#xaphuong').find(":selected").val(),
        "details": [{
            "productId": $('#ProductId').val(),
            "variantId": $('#VariantId').val(),
            "quantity": $('#Quantity').val(),
            "price": $('#Price').val(),
            "money": $('#Money').val()
        }],
        "weight": $('#Weight').val(),
        "shipPartner": "Giao hàng tiết kiệm",
        "shipMoney": "30000",
        "shopShipMoney": "30000",
        "shipType": "Chuẩn"

    }
    $.ajax({
        url: 'http://45.118.145.91:9999/pos/api/create/order?shop_token=AmlWspRNhvjO7z4iPD0eWekLLUeODOYt',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(invoice),
        success: function(data) {

            console.log(data);
            location.reload();
            alert("Đăng ký mua hàng thành công!");
        },
        error: function(error) {

            console.log(error);
        }
    });
})