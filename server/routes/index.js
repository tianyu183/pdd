const express = require('express');
const router = express.Router();
const conn = require('./../db/db');
const svgCaptcha = require('svg-captcha');
const sms_util = require('./../util/sms_util');
const md5 = require('blueimp-md5');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

const recommendArr = require('./../data/recommend').data;
router.get('/recommend/api', function (req, res, next) {
    // 1. 定义临时数组
    let temp_arr_all = [];  //[[],……,[]]
    // 2. 遍历
    for (let i = 0; i < recommendArr.length; i++) {
        // 2.1 取出单个数据对象
        let oldItem = recommendArr[i];
        // console.log(oldItem)
        // 2.2 取出数据表中对应的字段
        let temp_arr = [];
        temp_arr.push(oldItem.goods_id);
        temp_arr.push(oldItem.goods_name);
        temp_arr.push(oldItem.short_name);
        temp_arr.push(oldItem.thumb_url);
        temp_arr.push(oldItem.hd_thumb_url);
        temp_arr.push(oldItem.image_url);
        temp_arr.push(oldItem.price);
        temp_arr.push(oldItem.normal_price);
        temp_arr.push(oldItem.market_price);
        temp_arr.push(oldItem.sales_tip);
        temp_arr.push(oldItem.hd_url);
        // 2.3 合并到大的数组
        temp_arr_all.push(temp_arr);
    }
    // console.log(temp_arr_all);

    // 3. 批量插入数据库表
    // 3.1 数据库查询的语句
    let sqlStr = "INSERT INTO pdd_recommend(`goods_id`,`goods_name`,`short_name`, `thumb_url`, `hd_thumb_url`, `image_url`, `price`, `normal_price`, `market_price`, `sales_tip`, `hd_url`) VALUES ?";
    // 3.2 执行语句
    conn.query(sqlStr, [temp_arr_all], (error, results, fields) => {
        if (error) {
            console.log(error);
            console.log('插入失败');
        } else {
            console.log('插入成功');
        }
    });
});


/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res) => {
    /*
      const data = require('../data/homecasual').data;
      res.json({success_code: 200, message: data})
     */

    // console.log(req.session.captcha);

    // 1.1 数据库查询的语句
    let sqlStr = 'SELECT * FROM pdd_homecasual';
    // 1.2 执行语句
    conn.query(sqlStr, (error, results, fields) => {
       // console.log(results[0]);
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            res.json({success_code: 200, message: results});
        }
    });
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res) => {
    /*
    let sqlStr = 'select * from homenav';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 0, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */

    const data = require('../data/homenav');
    res.json({success_code: 200, message: data});
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res) => {
    /*
    let sqlStr = 'select * from homeshoplist';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 0, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    setTimeout(function () {
        const data = require('../data/shopList');
        res.json({success_code: 200, message: data})
    }, 300);
});

/**
 * 获取推荐商品列表(分页获取)
 *  1, 20
 */
router.get('/api/recommendshoplist', (req, res) => {
    /*setTimeout(function () {
        const data = require('../data/recommend').data;
        res.json({success_code: 200, message: data})
    }, 10);*/

    // 1.0 获取参数
    let pageNo = req.query.page || 1;  //当前页码
    let pageSize = req.query.count || 20;  //每页多少条数据
    // console.log(pageNo);
    // console.log(pageSize);

    // 1.1 数据库查询的语句
    let sqlStr = 'SELECT * FROM pdd_recommend LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;
    // console.log(sqlStr);

    // 1.2 执行语句
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            //这里加延时函数是为了测试前端的加载情况
            setTimeout(() => {
                res.json({success_code: 200, message: results});
            }, 2000);
        }
    });
});


/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res) => {
    setTimeout(function () {
        const data = require('../data/recommend_users');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res) => {
    setTimeout(function () {
        const data = require('../data/search');
        res.json({success_code: 200, message: data})
    }, 10);

    // console.log('session验证', req.session.captcha)  //用来证明客户端localhost和127.0.0.1保存的session是不一样的
});



/*
 一次性图形验证码
*/
router.get('/api/captcha', (req, res) => {
    //1.生成随机验证码
    let captcha = svgCaptcha.create({
        size: 4,  //验证码长度
        ignoreChars: '0o1i', //验证码字符中排除0o1i
        noise: 3, //干扰线条的数量
        color: true,  //是否给验证码字体设置各种颜色
        // background: '#cc9966', //验证码背景色
    });
    console.log(captcha.text);

    //2.将验证码保存在session中,之后只要在会话期间,每次客户端向服务器发请求时req中都含有session.captcha
    req.session.captcha = captcha.text.toLocaleLowerCase();
    // console.log(req.session);

    //3.返回客户端
    res.type('svg');
    res.send(captcha.data);
    // console.log(captcha.data)
});

/*
  发送验证码短信
*/
let users = {}; //用户信息
router.get('/api/send_code', (req, res) => {
    // 1. 获取手机号码
    let phone = req.query.phone;

    // 2. 随机产生验证码
    let code = sms_util.randomCode(6);
    console.log(code);

    //执行下面这些操作，会真正的向手机用户发送验证码
   /* sms_util.sendCode(phone, code, function (success) {
       if (success) {
            users[phone] = code;
            res.json({success_code: 200, message: '验证码获取成功!'});
        } else {
            res.json({err_code: 0, message: '验证码获取失败!'});
        }
    });*/


    //以下是模拟发送完验证码给手机用户的情况
    // 成功
    setTimeout(() => {
        users[phone] = code;
        res.json({success_code: 200, message: code});
    }, 2000);

    // 失败
    /*setTimeout(()=>{
        res.json({err_code: 0, message: '验证码获取失败!'});
    }, 2000);*/

});


/*
  手机短信验证码登录
*/
router.post('/api/login_code', (req, res) => {
    // 1. 获取数据
    const phone = req.body.phone;
    const code = req.body.code;

    // 2. 验证验证码是否正确
     if(users[phone] !== code){
         res.json({err_code: 0, message: '验证码不正确!'});
         return ;
     }

    // 3. 查询数据
    delete  users[phone];

    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_phone = '" + phone + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            // console.log(results)
            results = JSON.parse(JSON.stringify(results));  //把数据库中返回的数据先转成字符串,然后再转成JSON格式(变成一个数组)
            if (results[0]) {  // 用户已经存在
                // console.log(results[0]);
                req.session.userId = results[0].id;
                // 返回数据给客户端
                res.json({
                    success_code: 200,
                    message: {
                        id: results[0].id,
                        user_name: results[0].user_name,
                        user_phone: results[0].user_phone,
                        user_email: results[0].user_email,
                        user_sex: results[0].user_sex,
                        user_address: results[0].user_address,
                        user_birthday: results[0].user_birthday,
                        user_sign: results[0].user_sign
                    },
                });
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_phone) VALUES (?, ?)";
                const addSqlParams = [phone, phone];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    // console.log(results);
                    if(!error){
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'});
                            } else {
                                results = JSON.parse(JSON.stringify(results));
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: results[0].id,
                                        user_name: results[0].user_name,
                                        user_phone: results[0].user_phone,
                                        user_email: results[0].user_email,
                                        user_sex: results[0].user_sex,
                                        user_address: results[0].user_address,
                                        user_birthday: results[0].user_birthday,
                                        user_sign: results[0].user_sign
                                    },
                                });
                            }
                        });
                    }
                });
            }
        }
    });

});


/**
 * 用户名和密码登录
 */
router.post('/api/login_pwd', (req, res) => {
    // 1. 获取数据
    const user_name = req.body.name;
    const user_pwd = md5(req.body.pwd);
    const captcha = req.body.captcha.toLowerCase();

    // console.log(captcha, req.session.captcha, req.session);

    // 2. 验证图形验证码是否正确
    if(captcha !== req.session.captcha){
        res.json({err_code: 0, message: '图形验证码不正确!'});
        return;
    }
    delete req.session.captcha;


    // 3. 查询数据
    let sqlStr = "SELECT * FROM pdd_user_info WHERE user_name = '" + user_name + "' || user_phone = '"+user_name+ "' || user_email = '"+user_name+"' LIMIT 1";
    // console.log(sqlStr)
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '用户名不正确!'});
        } else {
            console.log(results)
            results = JSON.parse(JSON.stringify(results));
            if (results[0]) {  // 用户已经存在
                 // 验证密码是否正确
                 if(results[0].user_pwd !== user_pwd){
                     res.json({err_code: 0, message: '密码不正确!'});
                 }else {
                     req.session.userId = results[0].id;
                     // 返回数据给客户端
                     res.json({
                         success_code: 200,
                         message: {
                             id: results[0].id,
                             user_name: results[0].user_name,
                             user_phone: results[0].user_phone,
                             user_email: results[0].user_email,
                             user_sex: results[0].user_sex,
                             user_address: results[0].user_address,
                             user_birthday: results[0].user_birthday,
                             user_sign: results[0].user_sign
                         },
                         info: '登录成功!'
                     });
                 }
            } else { // 新用户
                const addSql = "INSERT INTO pdd_user_info(user_name, user_pwd) VALUES (?, ?)";
                const addSqlParams = [user_name, user_pwd];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    // console.log(results);
                    if(!error){
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + results.insertId + "' LIMIT 1";
                        conn.query(sqlStr, (error, results, fields) => {
                            if (error) {
                                res.json({err_code: 0, message: '请求数据失败'});
                            } else {
                                results = JSON.parse(JSON.stringify(results));
                                // 返回数据给客户端
                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: results[0].id,
                                        user_name: results[0].user_name,
                                        user_phone: results[0].user_phone,
                                        user_email: results[0].user_email,
                                        user_sex: results[0].user_sex,
                                        user_address: results[0].user_address,
                                        user_birthday: results[0].user_birthday,
                                        user_sign: results[0].user_sign
                                    },
                                });
                            }
                        });
                    }
                });
            }
        }
        // console.log(req.session);
    });
});


/*
*  根据session中的用户id获取用户信息, 可以实现自动登录
* */
router.get('/api/user_info', (req, res) => {
    // 1.0 获取参数
    let userId = req.session.userId;
    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM pdd_user_info WHERE id = '" + userId + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            if(!results[0]){
                delete req.session.userId;
                res.json({error_code: 0, message: '请先登录'});
            }else {
                // 返回数据给客户端
                res.json({
                    success_code: 200,
                    message: {
                        id: results[0].id,
                        user_name: results[0].user_name,
                        user_phone: results[0].user_phone,
                        user_email: results[0].user_email,
                        user_sex: results[0].user_sex,
                        user_address: results[0].user_address,
                        user_birthday: results[0].user_birthday,
                        user_sign: results[0].user_sign
                    },
                });
            }
        }
    });
});


/**
 * 退出登录
 */
router.get('/api/logout', (req, res) => {
    // 1.清除session中的userid
    delete req.session.userId;
    // 2. 返回客户端
    res.json({
        success_code: 200,
        message: '退出登录成功'
    });
});


/**
 * 修改用户信息
 */
router.post('/api/change_user_msg', (req, res) => {
    // 1. 获取数据
    const id = req.body.user_id;
    const user_name = req.body.user_name || '';
    const user_email= req.body.user_email || '';
    const user_sex = req.body.user_sex || '';
    const user_address = req.body.user_address || '';
    const user_birthday = req.body.user_birthday || '';
    const user_sign = req.body.user_sign || '';

    // 2. 验证
    if (!id) {
        res.json({err_code: 0, message: '修改用户信息失败!'});
        return ;
    }

    // 3. 更新数据
    let sqlStr = "UPDATE pdd_user_info SET user_name = ? , user_email = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ? WHERE id = " + id;
    let strParams = [user_name, user_email, user_sex, user_address, user_birthday, user_sign];
    conn.query(sqlStr, strParams, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '修改用户信息失败!'});
        } else {
            res.json({success_code: 200, message: '修改用户信息成功!'});
        }
    });

});

/**
 * 添加商品到购物车
 */
router.post('/api/add_shop_cart', (req, res) => {
    // 1. 验证用户
    let user_id = req.body.user_id;
    if(!user_id || user_id !== req.session.userId){
        res.json({err_code:0, message:'非法用户'});
        return;
    }

    // 2. 获取客户端传过来的商品信息
    let goods_id = req.body.goods_id;
    let goods_name = req.body.goods_name;
    let thumb_url = req.body.thumb_url;
    let price = req.body.price;
    let buy_count = 1;
    let is_pay = 0; // 0 未购买 1购买

    // 3. 查询数据
    let sql_str = "SELECT * FROM pdd_cart WHERE goods_id = '" + goods_id + "' AND user_id = '"+ user_id +"' LIMIT 1";
    conn.query(sql_str, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '服务器内部错误!'});
        } else {
            results = JSON.parse(JSON.stringify(results));
            // console.log(results);
            if (results[0]) { // 3.1 商品已经存在
                // console.log(results[0]);
                let buy_count = results[0].buy_count + 1;
                let sql_str = "UPDATE pdd_cart SET buy_count = " + buy_count + " WHERE goods_id = '" + goods_id + "' AND user_id = '"+ user_id +"'";
                conn.query(sql_str, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            } else { // 3.2 商品不存在
                let add_sql = "INSERT INTO pdd_cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
                let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id];
                conn.query(add_sql, sql_params, (error, results, fields) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            }
        }
    });

});

/**
 * 查询购物车的商品
 */
router.get('/api/cart_goods', (req, res) => {
    // 1.0 获取参数
    if(!req.session.userId){
        res.json({err_code: 0, message: '请先登录!'});
        return;
    }
    let user_id= req.session.userId;
    // 1.1 数据库查询的语句
    let sqlStr = "SELECT * FROM pdd_cart WHERE user_id = '" + user_id + "'";
    conn.query(sqlStr, (error, results, fields) => {
        if (error) {
            res.json({err_code: 0, message: '请求数据失败'});
        } else {
            // 返回数据给客户端
            res.json({success_code: 200, message: results});
        }
    });
});

module.exports = router;
