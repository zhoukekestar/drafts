#include <jni.h>
#include <string>
#include <map>

extern "C" {

namespace std {
    JNIEXPORT jstring JNICALL
    Java_io_github_zhoukekestar_hellojni_MainActivity_stringFromJNI(
            JNIEnv *env,
            jobject /* this */) {
        string hello = "Hello from C++";
        return env->NewStringUTF(hello.c_str());
    }

    JNIEXPORT jobject JNICALL
    Java_io_github_zhoukekestar_hellojni_MainActivity_newBtn(
            JNIEnv *env,
            jobject
    ) {
        jclass mapClass = env->FindClass("java/util/HashMap");
        jsize map_len = 5;
        jmethodID init = env->GetMethodID(mapClass, "<init>", "(I)V");
        jobject hashMap = env->NewObject(mapClass, init, map_len);

        jmethodID put = env->GetMethodID(mapClass, "put",
                                         "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");

        env->CallObjectMethod(hashMap, put,
                              env->NewStringUTF(((string)"height").c_str()),
                              env->NewStringUTF(((string)"100").c_str()));
        env->CallObjectMethod(hashMap, put,
                              env->NewStringUTF(((string)"width").c_str()),
                              env->NewStringUTF(((string)"500").c_str()));
        env->CallObjectMethod(hashMap, put,
                              env->NewStringUTF(((string)"x").c_str()),
                              env->NewStringUTF(((string)"100").c_str()));
        env->CallObjectMethod(hashMap, put,
                              env->NewStringUTF(((string)"y").c_str()),
                              env->NewStringUTF(((string)"100").c_str()));
        env->CallObjectMethod(hashMap, put,
                              env->NewStringUTF(((string)"text").c_str()),
                              env->NewStringUTF(((string)"hello jni").c_str()));
        return hashMap;
    }
}
}
