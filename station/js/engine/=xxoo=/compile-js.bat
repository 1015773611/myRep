java -jar closure-compiler-v20170626.jar -O ADVANCED --language_out ECMASCRIPT5_STRICT --generate_exports --js_output_file tmp.min.js --externs externs.js --js vars.js --js utils.js --js rpccli.js --js strUtil.js --js airtalkee.js --js av.js --js ctl_video.js --js ctl_video_ui.js
copy /y header.txt /b + tmp.min.js /b + tail.txt /b ..\pocsvc.min.js
del tmp.min.js
pause
