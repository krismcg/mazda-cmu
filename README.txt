Note: the tweaks.sh file details what will change when the USB is booted.


Format the USB drive as FAT32:
----------

Plug the flash drive into your computer.

In Terminal, run 
	$ diskutil list

Identify what device path is assigned to the USB drive. e.g. /dev/disk2 and format it as FAT32
	$ sudo diskutil eraseDisk FAT32 MAZDA MBRFormat {device_path}



Copy the tweak files over
----------
Now, copy tweaks or operating system upgrades to the flash drive
	--config (folder)
	--root files

**Change what mods get applied by modifying tweaks.sh**

Each tweak is commented to indicate the corresponding lines of code and separated by a blank line.

Just comment out the code for the tweaks you don't want.

Replace background.png inside the config folder with your own 800x480 .png if you want to use your own image.



Prepare the USB for the car to boot it
----------

Macs leave hidden files on USB drives that can prevent the CMU from accepting the tweak or system update. Nothing bad will happen, just your tweak won’t be applied, to overcome this, in Terminal run these (adapting to any ._ files too:
	$ cd /Volumes/MAZDA
	$ ls -al
	$ rm -rf .fseventsd .Spotlight-V100 .Trashes

Eject and remove the USB drive


In the Car
----------

Unplug any other USB or SD from the car except this drive.

Plug in the prepared USB.

Turn on the car onto ACC mode (but don't start the engine. 

Wait for the "Tweaks Applied" window to appear (could be a minute or more depending on how many files it has to copy)


** YOU MUST RESTART THE SYSTEM FOR THE TWEAKS **
** TO APPLY BY HOLDING DOWN MUTE+NAV FOR A FEW SECONDS **

