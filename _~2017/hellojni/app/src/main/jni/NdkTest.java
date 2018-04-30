/**
 * Created by Administrator on 8/8/2017.
 */

public class NdkTest {
    static {
        System.loadLibrary("NdkTest");//加载要使用的so文件
    }
    //生命native方法
    public static native String getString();
    public static native int doAdd(int param1,int param2);
}
