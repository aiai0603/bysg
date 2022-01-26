package com.example.bysg.util.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.bysg.util.yml.YmlUtil;


import java.util.Date;
import java.util.HashMap;

public class JwtUtil {
    //私钥
    private static final String TOKEN_SECRET = YmlUtil.getCommonYml("jwt-config.token-secret").toString();
    //过期时间
    private static final int EXPIRE_TIME = (int) YmlUtil.getCommonYml("jwt-config.expire-time");
    //生成token
    public static String sign(int userid,int companyid,int role){
        //过期时间
        Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        //私钥及加密算法
        Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
        //设置头信息
        HashMap<String, Object> header = new HashMap<>(2);
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        //生成签名
        return JWT.create().withHeader(header)
                .withClaim("userid",userid)
                .withClaim("companyid",companyid)
                .withClaim("role",role)
                .withExpiresAt(date).sign(algorithm);
    }

    //解析token
    public static boolean verity(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);

            return true;
        } catch (IllegalArgumentException e) {
            return false;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    //获取数据
    public static int getValuefromToken(String token,String key){
        Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT jwt = verifier.verify(token);
        int value = jwt.getClaim(key).asInt();
        return value;
    }





}
