var IMAGE_MAX = 222;
var COOKIE_NAME = "clear_check";
/**
 * ページ読み込み時
 */
$(document).ready(function() {

    //  クッキーからチェック状況を取得する
    var check_json = window.localStorage.getItem(COOKIE_NAME);
    var clear_check = {};
    if(check_json){
        clear_check = $.parseJSON(check_json);
    }
    // console.log(clear_check);
    // console.log(clear_check[1]);
    $('ul.image_table').html("");
    //  画像テーブル作成
    for(i = 1; i<= IMAGE_MAX; i++){
        //  チェック状態確認
        let checked_txt = "";
        let checked_cls = "";
        if (i in clear_check){
            //  配列に存在する
            if(clear_check[i] === true){
                checked_txt = "checked";
                checked_cls = "check";
            }
        }
        let number = ( '000' + i ).slice( -3 );
        let image_box = "<li class=\"img_box " + checked_cls + "\">";
        image_box += "<input id=\"clear_" + number + "\" type=\"checkbox\" class=\"clear_check\" name=\"clear_check\" value=\""+String(i)+"\" " + checked_txt + ">";
        image_box += "<label for=\"clear_" + number + "\">";
        image_box += "<img src=\"./img/"+number+".jpg\" alt=\""+number+"\">";
        image_box += "</label>";
        // image_box += "<span class=\"img_over\">済</span>";
        image_box += "<img class=\"img_over\" src=\"./img/work/sumi.png\" alt=\"済\">";
        image_box += "</li>";
        $('ul.image_table').append(image_box);
    }

    //  カウント最大数の更新
    $('.max_collection').text( String(IMAGE_MAX) );

    
    //  チェックされた数のカウント
    $(document.body).on('change','.clear_check',function(event){
        //  チェック数の更新
        clear_check_cnt_update();

        //  チェック状態保持
        let num = $(this).val();
        if($(this).prop('checked')){
            clear_check[num] = true;
        }else{
            clear_check[num] = false;
        }
        window.localStorage.setItem(COOKIE_NAME,JSON.stringify(clear_check));
    });

    //  初回のチェック数更新
    clear_check_cnt_update();

    //  チェックボックスにチェックが入ったら親にcheckクラスを渡す
    $('.img_box input.clear_check').on('change',function(){
        if($(this).prop('checked')){
            $(this).parent('.img_box').addClass('check');
        }else{
            $(this).parent('.img_box').removeClass('check');
        }
    });

    //  編集ON/OFFボタン
    $(document.body).on('change','.switchArea #switch1',function(event){
        if($(this).prop('checked')){
            $('.img_box').removeClass('not_edit');
        }else{
            $('.img_box').addClass('not_edit');
        }
    });
    $('.switchArea #switch1').trigger('change');
});

//  チェック数の更新
function clear_check_cnt_update(){
    let cnt = $('input.clear_check:checkbox:checked').length;
    $('span.fin_collection').text( cnt );
}