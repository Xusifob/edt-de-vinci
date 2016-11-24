cordova build --release android;
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/keys/my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name;
rm -rf EDT-devinci.apk;
~/Programmes/android-sdk-linux/build-tools/23.0.2/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk EDT-devinci.apk;