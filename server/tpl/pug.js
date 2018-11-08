module.exports = `
doctype html
html
    head
        meta(charset='utf-8')
        meta(name='viewport' content='width=device-width, initial-scale=1')
        title Koa Server Pug
        link(href='https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap-grid.min.css' rel='stylesheet')
        script(src='https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js')
        script(src='https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js')
    body
        .container
            .row
                .col-md-8
                    h1 hi #{you}
                    p This is #{me}
                .col-md-4
                    p 测试动态 Pug页面
`
