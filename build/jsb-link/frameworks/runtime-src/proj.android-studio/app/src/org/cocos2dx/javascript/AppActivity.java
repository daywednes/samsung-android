/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
//import org.jetbrains.annotations.NotNull;

import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;
import android.util.Log;
import android.widget.Toast;

//import com.samsung.android.sdk.blockchain.*;
//import com.samsung.android.sdk.blockchain.coinservice.CoinNetworkInfo;
//import com.samsung.android.sdk.blockchain.coinservice.CoinServiceFactory;
//import com.samsung.android.sdk.blockchain.coinservice.ethereum.EthereumService;
//import com.samsung.android.sdk.blockchain.exception.HardwareWalletException;
//import com.samsung.android.sdk.blockchain.exception.RootSeedChangedException;
//import com.samsung.android.sdk.blockchain.exception.SsdkUnsupportedException;
//import com.samsung.android.sdk.blockchain.network.EthereumNetworkType;
//import com.samsung.android.sdk.blockchain.wallet.HardwareWallet;
//import com.samsung.android.sdk.blockchain.wallet.HardwareWalletManager;
//import com.samsung.android.sdk.blockchain.wallet.HardwareWalletType;

import java.util.Hashtable;
import java.util.concurrent.ExecutionException;


public class AppActivity extends Cocos2dxActivity {

    static AppActivity currentContext;

    FakeBlockchainApi blockchainApi = new FakeBlockchainApi();



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            //  so just quietly finish and go away, dropping the user back into the activity
            //  at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);

        currentContext = this;

        blockchainApi.init();
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();

    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        SDKWrapper.getInstance().onDestroy();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }
        
    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
    }



    /// BLOCKCHAIN Code


//    static SBlockchain mSblockchain;
//    private static final int VENDOR_NOT_SUPPORTED = -1;
//    public static void initBlockchain(){
//        try {
//            mSblockchain = new SBlockchain();
//            mSblockchain.initialize(getContext());
//        } catch (SsdkUnsupportedException e) {
//            if (e.getErrorType() == VENDOR_NOT_SUPPORTED){
//                Log.e("error", "Platform SDK is not support this device");
//            }
//        }
//    }
//
//    CoinNetworkInfo mCoinNetworkInfo;
//    public void getCoinNetwork(){
//        mCoinNetworkInfo =
//                new CoinNetworkInfo(
//                        CoinType.ETH,
//                        EthereumNetworkType.MAINNET,
//                        "https://infura.io/" //ex. https://mainnet.infura.io/v3/xxxxx
//                );
//    }
//
//    public void getCointService() {
//        EthereumService etherService =
//                (EthereumService) CoinServiceFactory
//                        .getCoinService(
//                                getContext(),
//                                mCoinNetworkInfo
//                        );
//
//    }
//
//    HardwareWalletManager hardwareWalletManager;
//    public void getHardwareWalletManager(){
//        try {
//            hardwareWalletManager = mSblockchain.getHardwareWalletManager();
//        } catch (IllegalStateException e) {
//            // handling exception
//        }
//
//    }
//
//    public void connect(){
//        HardwareWalletType hardwareWalletType = HardwareWalletType.SAMSUNG;
//        ListenableFutureTask<HardwareWallet> connectionTask = hardwareWalletManager.connect(hardwareWalletType, true);
//
//        connectionTask.setCallback(
//                new ListenableFutureTask.Callback<HardwareWallet>() {
//                    @Override
//                    public void onSuccess(HardwareWallet hardwareWallet) {
//                        // Disconnect
//                        //hardwareWalletManager.disconnect(hardwareWallet);
//                    }
//
//                    @Override
//                    public void onFailure(@NotNull ExecutionException e) {
//                        Throwable cause = e.getCause();
//
//                        if (cause instanceof HardwareWalletException) {
//                            // handling hardware wallet error
//                        } else if (cause instanceof RootSeedChangedException) {
//                            // handling root seed changed exception
//                        }
//                    }
//
//                    @Override
//                    public void onCancelled(@NotNull InterruptedException e) {
//
//                    }
//                });
//
//    }

    public static int sum(int a, int b){
        return a + b;
    }

    public static void toast(String msg){
        Toast.makeText(currentContext, msg, Toast.LENGTH_LONG);
    }

    public static String getKeystore(){
        return currentContext.blockchainApi.getCurrentAccountKeystore();
    }

    public static int getScore(String keycode){
        return currentContext.blockchainApi.getScoreByKeycode(keycode);
    }

    public static void updateScore(String keycode, int score){
        currentContext.blockchainApi.updateScore(keycode, score);
    }

    public static String getLeaderboard(){
        return currentContext.blockchainApi.getLeaderboard();
    }

    class Player {
        public String name;
        public String keycode;
        public int score;

        public Player(String name, String keycode, int score) {
            this.name = name;
            this.keycode = keycode;
            this.score = score;
        }
    }

    class FakeBlockchainApi {
        private Hashtable<String, Player> leaderboard = new Hashtable();

        public void init() {
            String myKeystore = getCurrentAccountKeystore();

            leaderboard.put(myKeystore, new Player("Champion", myKeystore, 100000));
            leaderboard.put("queen_keycode", new Player("Queen", "queen_keycode", 80000));
            leaderboard.put("jack_keycode", new Player("Joker", "jack_keycode", 60000));
            leaderboard.put("some_guy1", new Player("some guy 1", "some_guy1", 55000));
            leaderboard.put("some_guy2", new Player("try harder", "some_guy2", 45000));
            leaderboard.put("some_guy3", new Player("guy 3", "some_guy3", 40000));
            leaderboard.put("some_guy4", new Player("random guy 4", "some_guy4", 36000));
            leaderboard.put("some_guy5", new Player("some guy 5", "some_guy5", 33000));
            leaderboard.put("some_guy6", new Player("guy 6", "some_guy6", 28000));
            leaderboard.put("some_guy7", new Player("clone 7", "some_guy7", 27500));
            leaderboard.put("some_guy8", new Player("guy 8", "some_guy8", 20000));
            leaderboard.put("some_guy9", new Player("random guy 9", "some_guy9", 14000));
        }

        public String getCurrentAccountKeystore(){
            return "your_keystore_here";
        }

        public String getLeaderboard(){
            return leaderboard.toString();
        }

        public int getScoreByKeycode(String keycode){
            if (leaderboard.containsKey(keycode)){
                return leaderboard.get(keycode).score;
            }

            return 0;
        }

        public void updateScore(String keycode, int score){
            if (leaderboard.containsKey(keycode)){
                leaderboard.get(keycode).score = score;
            }
        }
    }
}
