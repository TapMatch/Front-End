package com.tapmatch_front_end;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import io.branch.rnbranch.*;
import android.content.Intent;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this); 
      super.onCreate(savedInstanceState);
  }

  @Override
  protected void onStart() {
      super.onStart();
      RNBranchModule.initSession(getIntent().getData(), this);
  }

  @Override
  public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      RNBranchModule.onNewIntent(intent);
  }
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TapMatch_Front_end";
  }
}
