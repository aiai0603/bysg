package com.example.bysg.result;
//实现响应的枚举类
public enum ExceptionMsg {
    SUCCESS("200", "操作成功"),
    FAILED("400","操作失败"),
    PERMISSION("300","没有权限"),
    TOKENFAILED("403","token解析错误");

    private ExceptionMsg(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    private String code;
    private String msg;

    public String getCode() {
        return code;
    }
    public String getMsg() {
        return msg;
    }


}
