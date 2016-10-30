#! /bin/sh

# don't remove lines 4 and 5
echo 1 > /sys/class/gpio/Watchdog\ Disable/value
mount -o rw,remount /

# reduce disclaimer time (replaced with the systemApp.js replacement below)
# chmod 755 /jci/gui/apps/system/js/systemApp.js
# sed -i 's/this._disclaimerTime.remaining = 3500/this._disclaimerTime.remaining = 100/g' /jci/gui/apps/system/js/systemApp.js

# KRIS
# Update systemApp.js (Entertainment menu reorder, remove disclaimer)
chmod 755 /jci/gui/apps/system/js/systemApp.js
cp /jci/gui/apps/system/js/systemApp.js /mnt/sd*/backup/
cp /mnt/sd*/config/systemApp.js /jci/gui/apps/system/js/

# disable/enable touchscreen mod: enable = mod off, disable = mod on
/jci/scripts/set_lvds_speed_restriction_config.sh disable
/jci/scripts/set_speed_restriction_config.sh disable

# turn on wi-fi
cp /jci/gui/apps/syssettings/js/syssettingsApp.js /mnt/sd*/backup/
cp /mnt/sd*/config/syssettingsApp.js /jci/gui/apps/syssettings/js/

# change background image
cp /jci/gui/common/images/background.png /mnt/sd*/backup/
cp /mnt/sd*/config/background.png /jci/gui/common/images/

# remove safety warning from reverse camera
cp /jci/nativegui/images/SafetyText_AU_English.png /mnt/sd*/backup/
cp /mnt/sd*/config/SafetyText_AU_English.png /jci/nativegui/images/
cp /mnt/sd*/config/SafetyText_UK_English.png /jci/nativegui/images/
cp /mnt/sd*/config/SafetyText_US_English.png /jci/nativegui/images/
cp /mnt/sd*/config/SafetyText_ADR_English.png /jci/nativegui/images/

# remove blank album art frame, background line
cp /jci/gui/common/controls/NowPlaying4/images/NowPlayingImageFrame.png /mnt/sd*/backup/
cp /jci/gui/common/controls/NowPlaying4/images/NowPlayingBG.png /mnt/sd*/backup/
cp /jci/gui/common/images/no_artwork_icon.png /mnt/sd*/backup/
cp /mnt/sd*/config/NowPlayingImageFrame.png /jci/gui/common/controls/NowPlaying4/images/
cp /mnt/sd*/config/NowPlayingBG.png /jci/gui/common/controls/NowPlaying4/images/
cp /mnt/sd*/config/NowPlayingImageFrame.png /jci/gui/common/controls/InCall2/images/
cp /mnt/sd*/config/NowPlayingBG.png /jci/gui/common/controls/InCall2/images/
cp /mnt/sd*/config/no_artwork_icon.png /jci/gui/common/images/

# simplify button bar
cp /jci/gui/common/controls/Ump3/images/UMP_Bg_Arch.png /mnt/sd*/backup/
cp /jci/gui/common/controls/Ump3/images/UMP_Bg.png /mnt/sd*/backup/
cp /jci/gui/common/controls/Ump3/images/UMP_Btn_Separator.png /mnt/sd*/backup/
cp /mnt/sd*/config/UMP_Bg_Arch.png /jci/gui/common/controls/Ump3/images/
cp /mnt/sd*/config/UMP_Bg.png /jci/gui/common/controls/Ump3/images/
cp /mnt/sd*/config/UMP_Btn_Separator.png /jci/gui/common/controls/Ump3/images/

#simplify top notifications border
cp /jci/gui/common/controls/Sbn/images/StatusNotificationBg.png /mnt/sd*/backup/
cp /mnt/sd*/config/StatusNotificationBg.png /jci/gui/common/controls/Sbn/images/

#simplify audio names
cp /jci/gui/resources/js/btaudio/btaudioAppDict_en_AU.js /mnt/sd*/backup/
cp /jci/gui/resources/js/btaudio/btaudioAppDict_en_UK.js /mnt/sd*/backup/
cp /jci/gui/resources/js/btaudio/btaudioAppDict_en_US.js /mnt/sd*/backup/
cp /jci/gui/resources/js/usbaudio/usbaudioAppDict_en_AU.js /mnt/sd*/backup/
cp /jci/gui/resources/js/usbaudio/usbaudioAppDict_en_UK.js /mnt/sd*/backup/
cp /jci/gui/resources/js/usbaudio/usbaudioAppDict_en_US.js /mnt/sd*/backup/
cp /mnt/sd*/config/btaudioAppDict_en_AU.js /jci/gui/resources/js/btaudio/
cp /mnt/sd*/config/btaudioAppDict_en_UK.js /jci/gui/resources/js/btaudio/
cp /mnt/sd*/config/btaudioAppDict_en_US.js /jci/gui/resources/js/btaudio/
cp /mnt/sd*/config/usbaudioAppDict_en_AU.js /jci/gui/resources/js/usbaudio/
cp /mnt/sd*/config/usbaudioAppDict_en_UK.js /jci/gui/resources/js/usbaudio/
cp /mnt/sd*/config/usbaudioAppDict_en_US.js /jci/gui/resources/js/usbaudio/


#kill gracenote usb message
cp /jci/gui/apps/usbaudio/js/usbaudioApp.js /mnt/sd*/backup/
cp /mnt/sd*/config/usbaudioApp.js /jci/gui/apps/usbaudio/js/

#now playing screen re-layout
cp /jci/gui/common/controls/NowPlaying4/css/NowPlaying4Ctrl.css /mnt/sd*/backup/
cp /mnt/sd*/config/NowPlaying4Ctrl.css /jci/gui/common/controls/NowPlaying4/css/

# the "Tweaks Applied" window will appear for 10 seconds and then close automatically"
/jci/tools/jci-dialog --title="Tweaks Applied" --text="Remove USB. Reboot (MUTE + MUSIC + NAV)" --ok-label='OK' --no-cancel &
sleep 10
killall jci-dialog

