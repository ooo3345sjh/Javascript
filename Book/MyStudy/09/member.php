<?php

    $data = '[
        {"id":"1", "name":"Choldcroft", "email":"dcroft0@hibu.com"},
        {"id":"2", "name":"Erisa", "email":"erisa@naver.com"},
        {"id":"3", "name":"SEO", "email":"seo@google.com"}
    ]'

    echo $_GET["callback"]."(".$data.")";

?>