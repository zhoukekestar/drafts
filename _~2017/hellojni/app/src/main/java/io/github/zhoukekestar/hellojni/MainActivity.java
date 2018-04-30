package io.github.zhoukekestar.hellojni;

import android.support.constraint.ConstraintLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.AbsoluteLayout;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Example of a call to a native method
        TextView tv = (TextView) findViewById(R.id.sample_text);
        tv.setText(stringFromJNI());

        // new Btn
        ConstraintLayout layout = (ConstraintLayout)findViewById(R.id.content);
        HashMap btnConfig = newBtn();
        Button button = new Button(this);
        button.setWidth(Integer.parseInt((String) btnConfig.get("width")));
        button.setHeight(Integer.parseInt((String) btnConfig.get("height")));
        button.setText((String) btnConfig.get("text"));
        button.setX(Float.parseFloat((String) btnConfig.get("x")));
        button.setY(Float.parseFloat((String) btnConfig.get("y")));
        layout.addView(button);

        Log.d("MainActivity", btnConfig.toString());
    }

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public native String stringFromJNI();

    public native HashMap newBtn();
}
