package com.example.bysg.util;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.spec.AlgorithmParameterSpec;

public class AES {



        public static String wxDecrypt (String encrypted, String sessionKey, String iv)throws Exception {
            byte[] encrypData = Base64.decodeBase64(encrypted);
            byte[] ivData = Base64.decodeBase64(iv);
            byte[] sKey = Base64.decodeBase64(sessionKey);
            String decrypt = decrypt(sKey,ivData,encrypData);
            return decrypt;
        }

        public static String decrypt(byte[] key, byte[] iv, byte[] encData) throws Exception {
            AlgorithmParameterSpec ivSpec = new IvParameterSpec(iv);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
            //解析解密后的字符串
            return new String(cipher.doFinal(encData),"UTF-8");
        }

}