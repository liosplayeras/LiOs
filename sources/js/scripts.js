    var body_nuevos;
    var body_categorias;
    var body_popular;
    var body_todas;
    var url ="./sources/catalogo.json";
    var jsonData;

$(document).ready(function () {

    body_nuevos = "";
    body_categorias = "";
    body_popular = "";

    cargarDataJson("param1", "param2", "param3");
	//$("#container").load('ejemplo1.html');
/*
    try{
    	$.ajax({
            url: url, // path to file
            type: "GET",
            async: true,
            contentType: "application/json; charset=utf-8",
    		dataType: "json", // type of file (text, json, xml, etc)
    		success: function(data) { // callback for successful completion
                //console.log(data);
                jsonData=data;
                //console.log(jsonData);
                renderizarVistaPrincipal(jsonData);
                //$("#cargar_nuevo").html(JSON.stringify(data));
    		},
    		error: function() { // callback if there's an error
    		  alert("error");
    		}
    	});   
     } catch ( e ) {
        alert("ERROR: "+e);
     }
*/
   /*$.getJSON(url, function (data) {
        alert(data.miapp.id);
		$("#container").html(data.miapp.id);	
	}); */

    jQuery(".switch_price_prod").click(function () {
        jQuery("[js-price-value]").html(jQuery(this).attr("data-price_label"));
        jQuery("[js-license-type]").val(jQuery(this).attr("data-type"));
        jQuery("[js-price-dropdown]").html(jQuery(this).attr("data-label"));
    });

    //Mobile preview Iframe action
    $('.btn-iframe-to-mobile-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').addClass('iframe-preview--mobile');
    });
    $('.btn-iframe-to-desktop-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').removeClass('iframe-preview--mobile');
    });

    //Theme submission preview iframe toggle
    $('.btn-iframe-to-preview-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').attr('src', '//bootstrap-themes.github.io/dashboard');
    });
    $('.btn-iframe-to-details-trigger').on('click', function (event) {
        event.preventDefault();
        $('.iframe-preview').attr('src', location.origin + '/product/stripped');
    });

    //Setting initial frame
    $('#submitPreviewIframe').attr('src', location.origin + '/product/stripped');

    $('[js-handle="review-toggler"]').on('click', function (e) {
        e.preventDefault()
        $(this).tab('show')
        $(this).removeClass('active')
        $('.sub-nav-link.active').removeClass('active')
        $('.sub-nav-link[href="#reviews-tab"]').addClass('active')
        $('html, body').animate({
            scrollTop: $('.sub-nav-link[href="#reviews-tab"]').offset().top - 100
        }, 1000);
    });

});

function cargarDataJson(param1, param2, param3) {
    try{
        $.ajax({
            url: url, // path to file
            type: "GET",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json", // type of file (text, json, xml, etc)
            success: function(data) { // callback for successful completion
                //console.log(data);
                jsonData=data;
                //console.log(jsonData);
                renderizarVistaPrincipal(param1,jsonData);
                //$("#cargar_nuevo").html(JSON.stringify(data));
            },
            error: function() { // callback if there's an error
              alert("error");
            }
        });   
     } catch ( e ) {
        alert("ERROR: cargarDataJson "+e);
     }
}

/**
* Armar la vista con el JSON.
**/
function renderizarVistaPrincipal(param1, jsonData) {
    var jsonDataNuevos;
    var jsonDataPopular;
    var jsonDataCategorias;
    try{
        var length = Object.keys(jsonData).length;
        if(length > 0){
            jsonDataNuevos=jsonData.miapp.nuevo;
            jsonDataPopular=jsonData.miapp.popular;
            jsonDataCategorias=jsonData.miapp.catalogo;
            var lengthNuevos = Object.keys(jsonDataNuevos).length;
            var lengthPopular = Object.keys(jsonDataPopular).length;
            var lengthCategorias = Object.keys(jsonDataCategorias).length;
            if(lengthNuevos > 0){
                crearVistaNuevos(jsonDataNuevos);
            } else{
                alert("ERROR: Tamaño de registros "+length);
            }
            if(lengthPopular > 0){
                crearVistaPopular(jsonDataPopular);
            } else{
                alert("ERROR: Tamaño de registros "+length);
            }
            if(lengthCategorias > 0){
                crearVistaCategorias(param1, jsonDataCategorias);
            } else{
                alert("ERROR: Tamaño de registros "+length);
            }
        } else{
            alert("ERROR: Tamaño de registros "+length);
        }
    } catch ( e ) {
       alert("ERROR: renderizarVistaPrincipal "+e);
    }
}

function crearVistaNuevos(jsonDataNuevos) {
    console.log("crearVistaNuevos");
    body_nuevos += "<ul class='row'>";
    try{
        for (var i = 0; i < Object.keys(jsonDataNuevos).length; i++) {
            body_nuevos +="<li class='col-md-3 col-6'><div class='theme-card'><div class='theme-card__body'><a class='d-block' href='#'> "
                        +"<img width='400' height='300' src="+jsonDataNuevos[i].imagen+"  "
                              +"class='theme-card__img wp-post-image' alt='' srcset="+jsonDataNuevos[i].imagen+" 400w, "
                             +" "+jsonDataNuevos[i].imagen+" 300w, "
                            +"  "+jsonDataNuevos[i].imagen+" 768w, "
                             +" "+jsonDataNuevos[i].imagen+" 1024w, "
                             +" "+jsonDataNuevos[i].imagen+" 200w, "
                             +" "+jsonDataNuevos[i].imagen+" 600w, "
                             +" "+jsonDataNuevos[i].imagen+" 1200w, "
                             +" "+jsonDataNuevos[i].imagen+" 1440w' "
                             +" sizes='(max-width: 400px) 100vw, 400px'>            </a> "
                            +"  <a class='theme-card__body__overlay btn btn-brand btn-sm' href='#'>Detalle</a>"
                           +"</div>"
                           +"<div class='theme-card__footer'>"
                           +"   <div class='theme-card__footer__item'>"
                           +"      <a class='theme-card__title mr-1' href='#'>"+jsonDataNuevos[i].nombre+"</a>"
                            +"     <p class='theme-card__info'>Tallas"
                             +"    </p>"
                              +"   <ul class='prod_cats_list'>"
                               +"     <li><a href='#'>Colores</a></li>"
                                +" </ul>"
                             +"    <p></p>"
                            +"  </div>"
                             +" <div class='theme-card__footer__item'>"
                              +"   <p class='theme-card__price'><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>$</span>"+jsonDataNuevos[i].presio+"</span></p>"
                            +"     <p class='theme-card__info'>Tallas"
                             +"    </p>"
                               +"  <ul class='rating'>"
                                +"    <li class='rating__item '></li>"
                                 +"   <li class='rating__item '></li>"
                                  +"  <li class='rating__item '></li>"
                            +"        <li class='rating__item '></li>"
                             +"       <li class='rating__item '></li>"
                              +"   </ul>"
                        +"      </div>"
                        +"   </div>"
                       +" </div>"
                    +" </li>";
        }
        body_nuevos += "</ul>";
    } catch ( e ) {
       alert("ERROR: crearVistaNuevos "+e);
    }
    $("#cargar_nuevo").html(body_nuevos);
}
/*

*/
function crearVistaPopular(jsonDataPopular) {
    body_popular = "<ul class='row'>";
    try{
        //console.log(jsonDataPopular);
        for (var i = 0; i < Object.keys(jsonDataPopular).length; i++) {
            body_popular +="<li class='col-6'><div class='theme-card'><div class='theme-card__body'><a class='d-block' href='#'> "
            +"<img width='400' height='300' src="+jsonDataPopular[i].imagen+"  "
                  +"class='theme-card__img wp-post-image' alt='' srcset="+jsonDataPopular[i].imagen+" 400w, "
                 +" "+jsonDataPopular[i].imagen+" 300w, "
                +"  "+jsonDataPopular[i].imagen+" 768w, "
                 +" "+jsonDataPopular[i].imagen+" 1024w, "
                 +" "+jsonDataPopular[i].imagen+" 200w, "
                 +" "+jsonDataPopular[i].imagen+" 600w, "
                 +" "+jsonDataPopular[i].imagen+" 1200w, "
                 +" "+jsonDataPopular[i].imagen+" 1440w' "
                 +" sizes='(max-width: 400px) 100vw, 400px'>            </a> "
                +"  <a class='theme-card__body__overlay btn btn-brand btn-sm' href='#'>Detalle</a>"
               +"</div>"
               +"<div class='theme-card__footer'>"
               +"   <div class='theme-card__footer__item'>"
               +"      <a class='theme-card__title mr-1' href='#'>"+jsonDataPopular[i].nombre+"</a>"
                +"     <p class='theme-card__info'>Tallas"
                 +"    </p>"
                  +"   <ul class='prod_cats_list'>"
                   +"     <li><a href='#'>Colores</a></li>"
                    +" </ul>"
                 +"    <p></p>"
                +"  </div>"
                 +" <div class='theme-card__footer__item'>"
                  +"   <p class='theme-card__price'><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>$</span>"+jsonDataPopular[i].presio+"</span></p>"
                +"     <p class='theme-card__info'>Tallas"
                 +"    </p>"
                   +"  <ul class='rating'>"
                    +"    <li class='rating__item '></li>"
                     +"   <li class='rating__item '></li>"
                      +"  <li class='rating__item '></li>"
                +"        <li class='rating__item '></li>"
                 +"       <li class='rating__item '></li>"
                  +"   </ul>"
            +"      </div>"
            +"   </div>"
           +" </div>"
        +" </li>";
        }
        body_popular += "</ul>";
    } catch ( e ) {
       alert("ERROR: crearVistaPopular "+e);
    }
    $("#cargar_popular").html(body_popular);
}

function crearVistaCategorias(param1, jsonDataCategorias) {
    console.log("crearVistaCategorias");
    body_categorias = "<ul class='row'>";
    var keysCategorias;
    var keyUnit;
    try{

        for (var i = 0; i < Object.keys(jsonDataCategorias).length; i++) {
            keysCategorias=Object.keys(jsonDataCategorias);
            var jsonDataCategoria = jsonDataCategorias[keysCategorias[i]];

            for (var j = 0; j < Object.keys(jsonDataCategoria).length; j++) {
                
                body_categorias +="<li class='col-md-3 col-6'><div class='theme-card'><div class='theme-card__body'><a class='d-block' href='#'> "
                +"<img width='400' height='300' src="+jsonDataCategoria[j].imagen+"  "
                      +"class='theme-card__img wp-post-image' alt='' srcset="+jsonDataCategoria[j].imagen+" 400w, "
                     +" "+jsonDataCategoria[j].imagen+" 300w, "
                    +"  "+jsonDataCategoria[j].imagen+" 768w, "
                     +" "+jsonDataCategoria[j].imagen+" 1024w, "
                     +" "+jsonDataCategoria[j].imagen+" 200w, "
                     +" "+jsonDataCategoria[j].imagen+" 600w, "
                     +" "+jsonDataCategoria[j].imagen+" 1200w, "
                     +" "+jsonDataCategoria[j].imagen+" 1440w' "
                     +" sizes='(max-width: 400px) 100vw, 400px'>            </a> "
                    +"  <a class='theme-card__body__overlay btn btn-brand btn-sm' href='#'>Detalle</a>"
                   +"</div>"
                   +"<div class='theme-card__footer'>"
                   +"   <div class='theme-card__footer__item'>"
                   +"      <a class='theme-card__title mr-1' href='#'>"+jsonDataCategoria[j].nombre+"</a>"
                    +"     <p class='theme-card__info'>Tallas"
                     +"    </p>"
                      +"   <ul class='prod_cats_list'>"
                       +"     <li><a href='#'>Colores</a></li>"
                        +" </ul>"
                     +"    <p></p>"
                    +"  </div>"
                     +" <div class='theme-card__footer__item'>"
                      +"   <p class='theme-card__price'><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>$</span>"+jsonDataCategoria[j].presio+"</span></p>"
                    +"     <p class='theme-card__info'>Tallas"
                     +"    </p>"
                       +"  <ul class='rating'>"
                        +"    <li class='rating__item '></li>"
                         +"   <li class='rating__item '></li>"
                          +"  <li class='rating__item '></li>"
                    +"        <li class='rating__item '></li>"
                     +"       <li class='rating__item '></li>"
                      +"   </ul>"
                +"      </div>"
                +"   </div>"
               +" </div>"
            +" </li>";
            }
        }
        body_categorias += "</ul>";
    } catch ( e ) {
       alert("ERROR: crearVistaCategorias "+e);
    }
    $("#cargar_categorias").html(body_categorias);
}


function crearVistaPorCategorias(jsonDataCategorias) {
    console.log("crearVistaCategorias");
    body_todas = "<ul class='row'>";
    var keysCategorias;
    var keyUnit;
    try{

        for (var i = 0; i < Object.keys(jsonDataCategorias).length; i++) {
            keysCategorias=Object.keys(jsonDataCategorias);
            var jsonDataCategoria = jsonDataCategorias[keysCategorias[i]];

            for (var j = 0; j < Object.keys(jsonDataCategoria).length; j++) {
                
                body_todas +="<li class='col-md-3 col-6'><div class='theme-card'><div class='theme-card__body'><a class='d-block' href='#'> "
                +"<img width='400' height='300' src="+jsonDataCategoria[j].imagen+"  "
                      +"class='theme-card__img wp-post-image' alt='' srcset="+jsonDataCategoria[j].imagen+" 400w, "
                     +" "+jsonDataCategoria[j].imagen+" 300w, "
                    +"  "+jsonDataCategoria[j].imagen+" 768w, "
                     +" "+jsonDataCategoria[j].imagen+" 1024w, "
                     +" "+jsonDataCategoria[j].imagen+" 200w, "
                     +" "+jsonDataCategoria[j].imagen+" 600w, "
                     +" "+jsonDataCategoria[j].imagen+" 1200w, "
                     +" "+jsonDataCategoria[j].imagen+" 1440w' "
                     +" sizes='(max-width: 400px) 100vw, 400px'>            </a> "
                    +"  <a class='theme-card__body__overlay btn btn-brand btn-sm' href='#'>Detalle</a>"
                   +"</div>"
                   +"<div class='theme-card__footer'>"
                   +"   <div class='theme-card__footer__item'>"
                   +"      <a class='theme-card__title mr-1' href='#'>"+jsonDataCategoria[j].nombre+"</a>"
                    +"     <p class='theme-card__info'>Tallas"
                     +"    </p>"
                      +"   <ul class='prod_cats_list'>"
                       +"     <li><a href='#'>Colores</a></li>"
                        +" </ul>"
                     +"    <p></p>"
                    +"  </div>"
                     +" <div class='theme-card__footer__item'>"
                      +"   <p class='theme-card__price'><span class='woocommerce-Price-amount amount'><span class='woocommerce-Price-currencySymbol'>$</span>"+jsonDataCategoria[j].presio+"</span></p>"
                    +"     <p class='theme-card__info'>Tallas"
                     +"    </p>"
                       +"  <ul class='rating'>"
                        +"    <li class='rating__item '></li>"
                         +"   <li class='rating__item '></li>"
                          +"  <li class='rating__item '></li>"
                    +"        <li class='rating__item '></li>"
                     +"       <li class='rating__item '></li>"
                      +"   </ul>"
                +"      </div>"
                +"   </div>"
               +" </div>"
            +" </li>";
            }
        }
        body_todas += "</ul>";
    } catch ( e ) {
       alert("ERROR: crearVistaCategorias "+e);
    }
    $("#cargar_todas").html(body_categorias);
}

