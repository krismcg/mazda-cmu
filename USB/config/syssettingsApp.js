
/*
 Copyright 2012 by Johnson Controls
 __________________________________________________________________________

 Filename: syssettingsApp.js
 __________________________________________________________________________

 Project: JCI-IHU
 Language: EN
 Author: apopoval
 Date: 20.09.2012
 __________________________________________________________________________

 Description:   IHU GUI syssettings  App 

 Revisions:
 v0.1 (20-Sep-2012) SysSettings created for initial testing of active panel content according to UI Specs 3.04 
 v0.2 (10-Oct-2012) Updated according to UI Specs 3.50
 v0.3 (11-Oct-2012) Updated according to the latest JSON file
 v0.4 (15-Oct-2012) Communication* contexts changed to Com*, tabsConfig appData and style changed (preview image)
 v0.5 (16-Oct-2012) Range and increment of sliders is set [0-100,1], proper language strings
 v0.6 (17-Oct-2012) log.info changed to log.debug, HudTab renamed to HUDTab, empty tabs removed from tabctrl, removed slideCallback from sliders
 v0.7 (18-Oct-2012) + VehicleSettingsTab
 v0.8 (19-Oct-2012) Sound and Volume tabs added
 v0.9 (23-Oct-2012) Tabs appdata modified, added realtime clock in DisplayOffClock
 v1.0 (24-Oct-2012) Handles 'undefined' languageIDs
 v1.1 (25-Oct-2012) Added debugMode transition from ChangeLanguageSuccess to ChangeLanguage
 v1.2 (29-Oct-2012) Added OffScreen ctrl, removed slideEndCallback
 v1.3 (31-Oct-2012) Added HudInstalled message handling, reverted to DialogCtrl in DisplayOff and DisplayOffClock, use of OffScreen control postponed for next build
 v1.4 (08-Nov-2012) Using OffScreen ctrl and tmplt, moved them to /apps/syssettings/
 v1.5 (08-Nov-2012) Fixed message handling (GUI didn't cached msgs if a syssettings contex was not previously loaded )
 v1.6 (09-Nov-2012) SelectDateFormat appData changed to SetDateFormat, ComSettingsResetProgress > ResetComSettings
 v1.7 (13-Nov-2012) SetClock is using listCtrl for test purposes, AtSpeed and NoSpeed now disable/enable speed restricted items
 v1.8 (16-Nov-2012) LanguageConf context is localized before displayed, LanguageConf msg is removed
 v1.9 (20-Nov-2012) Added hardcoded timezones list, added Contrast slider in DisplayTab, AtSpeed takes GpsSync in consideration, _tabsConfig changed, reverted LanguageConf localization
 v2.0 (23-Nov-2012) LanguageConf context is localized before displayed using a workaround, SelectLanguageConf item style changed to oneLineOneImageRight
 v2.1 (27-Nov-2012) Updated the SetClock functionality, switched from "Global.SelectSettingsTab" to "Global.IntentSettingsTab", added status bar text indicating where you are
 v2.2 (28-Nov-2012) Contrast slider range changed to 0-10
 v2.3 (04-Dec-2012) Added AppSDK support for getting the Preset Messages List
 v2.4 (05-Dec-2012) Added framework localize support
 v2.5 (06-Dec-2012) Removed title from CommunicationSettings ctxt
 v2.6 (11-Dec-2012) Removed Toggle HUDTab
 v2.7 (12-Dec-2012) Added ClockSettingsCtrl
 v2.7 (14-Dec-2012) Added payload to SelectLanguageConf event, LanguageConf ctxt has languageID for payload
 v2.8 (17-Dec-2012) Using ClockSettingsCtrl in SetClock, changes in SetLanguage 
 v2.9 (18-Dec-2012) Added KeyboardLanguage message handler
 v3.0 (18-Dec-2012) Added setLanguage callbacks
 v3.1 (19-Dec-2012) Removed explicit control loading from registerAppLoaded
 v3.2 (19-Dec-2012) Minor updates in change language flow
 v3.2 (19-Dec-2012) Removed DateFormat
 v3.2 (19-Dec-2012) Added timestamp parameter to CurrentTime msg
 v3.3 (19-Dec-2012) Bugfix in change language
 v3.4 (19-Dec-2012) Added SendCurrentTimeEpoch msg, updated AdjustTime event
 v3.5 (21-Dec-2012) Bugfix in _SendCurrentTimeEpochMsgHandler
 v3.6 (04-Jan-2013) Started implementing UI Specs v3.54, using List2Ctrl
 v3.7 (07-Jan-2013) Ignoring 'UNKNOWN UIA_SYSSETTINGS_Languages' in LanguagesList message
 v3.8 (08-Jan-2013) Added UI Specs v3.54 features, waiting final event spreadsheets
 v3.9 (11-Jan-2013) Events update
 v4.0 (12-Jan-2013) Added msg handlers for progress bars
 v4.1 (12-Jan-2013) Events update
 v4.2 (14-Jan-2013) LanguageChangeError sends SetLanguage event on "yes"
 v4.3 (15-Jan-2013) Updated Hud_Installed message handling
 v4.4 (17-Jan-2013) Slider ranges updated, added OK button to AgreementsDisclaimers, 
 v4.5 (18-Jan-2013) Added TTS support to SetVoiceGuidanceRingVolume and SetCallVolume.
 v4.6 (21-Jan-2013) Removed obselete updateClock function
 v4.7 (23-Jan-2013) Changed SetContactsSortOrder payload
 v4.9 (25-Feb-2013) Correct message handlers in communication settings context
 v5.0 (26-Feb-2013) Create separate event for Meridian time format change under Clock setting
 v5.1 (28-Feb-2013) Corrected ringtone type
 v5.2 (04-Mar-2013) Added support for ignition off & On for factory reset
 v5.3 (07-Mar-2013) Corrected text ids for Clock Settings
 v5.4 (08-Mar-2013) Support for menu removable distance & temp settings
 v5.5 (09-Mar-2013) enable MP911 entry only in USA&CANADA & not Mexico based on MMUI msg
 v5.6 (20-Mar-2013) Update the Time Zone settings
 v5.7 (20-Mar-2013) Added bluetooth button under communication settings
 v5.8 (20-Mar-2013) Added support for handling LVDS over temparature
 v5.9 (26-Mar-2013) Added support for "TimeZoneSetting" under clock settings
 v6.0 (27-Mar-2013) factory reset is enabled by default.
 v6.1 (03-Apr-2013) Factory reset progress context is reverted back.
 v6.2 (04-Apr-2013) Set time & meridiem is sent for every adjust.
 v6.3 (10-Apr-2013) Clock Tab is added.
 v6.4 (16-Apr-2013) HUD installed shared data support is added.
 v6.5 (16-Apr-2013) Ignition status shared data support is added.
 v6.6 (16-Apr-2013) Added support for CAN status shared data
 v6.7 (16-Apr-2013) Added support for About context
 v6.8 (16-Apr-2013) Removed DisplayOff & DisplayOffClock contexts
 v6.9 (16-Apr-2013) Corrected the time zones
 v7.0 (16-Apr-2013) Added support for prompt when TTS and no VR
 v7.1 (17-Apr-2013) Removed Duplicate entries in Time Zone
.v7.2 (17-Apr-2013) Modified code to rectify SystemTab crash
.v7.3 (17-Apr-2013) Implemented ToolTips in SystemTab
.v7.4.(23-Apr-2013) Implemented Speed Restricted Behavior
.v7.5.(23-Apr-2013) Updated Preset Messages to show correct value after Communication Reset
.v7.6.(23-Apr-2013) Rectified List for EU for Mobile 999
.v7.7.(24-Apr-2013) Implemented stringIds from common
.v7.8.(26-Apr-2013) Corrected Time zone entry for Pacific
.v7.9.(03-May-2013).Removed Duplicate entries in Time Zone for Casabalanca and Co-ordinated Universal Time
.v8.0.(07-May-2013).Updated Status Bar Title for ComposeMessage context
.v8.1.(08-May-2013).Updated individual items in Lists in message handlers instead of populating whole list
.v8.2.(13-May-2013).Implemented HUD dynamic support
.v8.3.(13-May-2013).Made changes to support dynamic removable list for Global.GoBack
.v8.4.(14-May-2013).Handled messages in message handlers instead of calling populate
.v8.5.(15-May-2013).Reverted Selected language on Error, updated GPSSync message
.v8.6.(17-May-2013).Changed Adjust Time status bar, removed deprecated contexts
.v8.7.(23-May-2013).Updated to latest Clock2Settings to support tooltips.
.v8.8.(24-May-2013).Removed LanguageChangeSuccess context and replaced with a Wink.
.v8.9.(28-May-2013).Added support for 3.9 dictionaries
.v9.0.(03-June-2013).Assigned list item values in populate directly instead of using APIs for correct Reset functionality
.v9.1.(05-June-2013).Corrected localization as per new framework directions
.v9.2.(05-June-2013).Implemented Speed-restricted behavior for Communication Screen as per new UI spec
.v9.3.(05-June-2013).Added tabsGroup property for tab contexts
.v9.4.(07-June-2013).Implemented Dialog Default to 'No', Implemented Destination code, Corrected Preset Messages display in ComposeMessage 
.v9.5.(07-June-2013).Corrected Clock Implementation with context check for messages and showing correct time, also modified clocktab title
.v9.6.(13-June-2013).Changed Map image to generic for Display Tab
.v9.7.(13-June-2013).Implemented Keyboard Languages
.v9.8.(20-June-2013).Corrected language change issue to send "GUILanguageChangeStatus" after language change success callback from fwrk
.v9.8.(21-June-2013).Added check for methodErrorResponse in AppSDK callback
.v9.9.(21-June-2013).Truncation Ideation Updates(styleOnOff for On/Off toggle, smallText for all List2)
.v10.0.(21-June-2013).Implemented list items for display instead of toggle buttons to support toggle functionality of commander
.v10.1.(26-June-2013).Implemented At-Speed and other enabling-disabling functionality in a seperate function instead of populate function
.v10.2.(04-July-2013).Rectified display of Preset Messages on System Reset.
.v10.3.(05-July-2013).Implemented Agreements ans Disclaimers screen as ScrollDetail control.
.v10.4.(05-July-2013).Corrected TimeZone entries for UTC1 and Kabul
.v10.5.(05-July-2013).Upgraded to dialog3Ctrl
.v10.6.(10-July-2013).Dictionary correction in UseUKEnglish context for "Guidance"
.v10.7.(12-July-2013).Mazda System Bench: Currently Selected Language Grayed
.v10.8.(16-July-2013).Dictionary Updates from Master Dictionary
.v10.9.(16-July-2013).Corrected Single Select Dialog vs. Multiple Select List Screens as per directions
.v10.9.(16-July-2013).Implemented minChangeInterval of 1sec
.v10.10.(7-Aug-20130. Corrections after new translations
.v11.0.(8-Aug-2013).Implemented setTick() api to implement tick mark, updated list in EnableDisableControlItems and used setToggle() api for ComSettings
.v11.1.(10-Aug-2013).Modified Lang and Keyboard Language codes and Prevented quick navigation to Adjust Time on GPSSync ON
.v11.2.(11-Aug-2013).Implemented AgreementsDisclaimers screen based on new ScrollDetail requirements
.v11.3.(13-Aug-2013).Added 'rotationIdleDetectTime' to smoothen slider stuttering, implemented partially visible dialogs and implemented style14 for dialog truncation
.v11.4.(13-Aug-2013).Modified speed-restricted behavior according to new Mazda requirements (Volume sliders in CommunicationSettings and Reset in DisplayTab)
.v11.5.(5-Sep-2013).Reverted back to radio buttons instead of tickmarks.
.v11.6.(12-Sep-2013).Changed dialog text if language has TTS but no VR
.v11.7.(14-Sep-2013).Restore Daylight Savings to Clock menu.
.v11.8.(16-Sep-2013).PresetMessageList no longer cached.
.v11.9.(01-Oct-2013).Implemented disabling of GPSSync items in a different function.
.v12.0.(08-Oct-2013).Implemented 'full overlay' for all uninterruptable dialogs.
.v12.1.(21-Oct-2013).Added event to prompt MMUI for LanguageChanged_Alert.
.v12.2.(22-Oct-2013).Removed Language list item for JP region.
.v12.3.(25-Oct-2013).Removed Retry option for FactoryResetError screen.
.v12.4.(28-Oct-2013).Removed FactoryResetError context.
.v12.5.(05-Nov-2013).Update CMU legal disclosure screen text
.v12.6.(06-Nov-2013).MY14 Mazda PIT: Time Zone Select not selectable when in GPS Sync mode
.v12.7.(06-Nov-2013).Remove wi-fi from devices tab for japan region
.v12.8.(16-Apr-2014).Seperated Email and SMS notifications
.v12.9.(06-May-2014).Added check for keyboard language support in Keyboard control
.v13.0.(07-May-2014).Changed style for recently added keyboard languages to show radio
.v13.1.(19-June-2014).Email settings not present by default. Available in all regions except Japan if Email is supported
.v13.2.(28-Aug-2014).Added support for other languages in UseUKEnglish context for TTS support
.v13.3.(03-Sep-2014).Corrected VR volume slider re-adjustment before and after VR session.

_____________________________________________________________________________________________________________________________________________________________________

 */

log.addSrcFile("syssettingsApp.js", "syssettings");


function syssettingsApp(uiaId)
{   
    log.debug("Constructor called.");

    // Base application functionality is provided in a common location via this call to baseApp.init().
    // See framework/js/BaseApp.js for details.
    baseApp.init(this, uiaId);
}


/**************************
 * App Init is standard function called by framework *
 **************************/

/*
 * Called just after the app is instantiated by framework.
 * All variables local to this app should be declared in this function
 */
syssettingsApp.prototype.appInit = function()
{
    log.debug("syssettingsApp appInit  called...");
    
    if (framework.debugMode)
    {
        utility.loadScript("apps/syssettings/test/syssettingsAppTest.js");
    }
    
    /* 
     * NOTE:
     * Every time a function is bound (using bind()), a new
     * function is created in memory. Whenever possible,
     * only bind the same function once and use reference.
     */
    this.listItemClick = this._menuItemSelectCallback.bind(this);
    this.listItemSlide = this._menuItemSlideCallback.bind(this);
    this.dialogBtnClick = this._dialogDefaultSelectCallback.bind(this);
    this.tabClick = this._tabClickCallback.bind(this);
    this.timeChangedCallback = this._timeChangedCallback.bind(this);
    this.scrollDetailClick = this._scrollSelectCallback.bind(this);
    
    this._cachedHoldButtonInterval = 250;
    
    this._cachedLanguage = null;  
    this._cachedPreviousLanguage = null;  
    this._cachedMessageIndex = null;
    this._cachedMessageText = null;
    this._cachedInterval = null; 
    this._cachedTabsConfig = null;
    
    //Message cache
    this._cachedDayNightMode = null;
    this._cachedDisplayOverTemperature = null;
    this._cachedBrightness = null;
    this._cachedContrast = null;
    this._isListChanged = false;                        //Checks if the dynamic list is changed to disable the focus restore
    this._cachedLanguageSupported = null;
    this._cachedLanguageSupportVR = null;
    this._cachedLanguageSupportTTS = null;
    this._cached_UKEng_Taiw_Braz_Cant_Lang = "LANGS_UK_ENGLISH";
    this._cachedLanguagesList = null;
    this._cachedTemperature = null;
    this._cachedDistance = null;
    this._cachedIgnitionStatus = true;
    this._cachedCANStatus = true;
    this._factoryResetStatus = "Enabled"                //Enabled 2 seconds after Ignition
    this._cachedVolume = null;
    this._cachedTimeFormat = "hrs12";
    this._cachedDateFormat = null;
    this._cachedGPSSync = "Off";
    this._cachedNaviStatus = "Unavailable";
    this._cachedDayLightSavingsTime = "Off";
    this._cachedCurrentTime = null;
    this._cachedMeridiem = null;
    this._cachedTimeZoneIndex = 14;                        //Eastern Time UTC + 5:00
    this._cachedTimeZoneList = null;
    this._cachedEmailNotification = null;
    this._cachedSMSNotification = null;
    this._cachedIncomingCallNotification = null;
    this._cachedMob911 = 'On';
    this._cachedRingToneType = null;
    this._cachedPhoneVolumeControl = "Enabled";
    this._cachedHandsfreeVolume = null;
    this._cachedKeyboardLanguage = null;
    this._cachedRegion = null;
    this._cachedContactsSortOrder = 0;
    
    this._cachedDownloadCallHistory = null;
    this._cachedDownloadCallContacts = null;
    this._cachedDownloadCallText = null;
    this._cachedDownloadCallEmail = null;
    this._cachedVR_RingtoneVolumeControl = "Enabled";
    this._cachedRingtoneAndVRVolume = null;
    
    //ABC Keyboard Implementation
    this._cachedMaxNumberofRecentLanguages = 0;
    this._cachedRecentLanguagesNumber = 0;
    
    //HUD Tab installation status
    this._HUDInstalledStatus = true;
        
    // framework.localize 
    this._isLangChangeSuccess = false;
    
    this._connectionIn = null;
    this._cachedPresetMessagesList = new Array();
    this._cachedPresetMessagesChunk = null;
    this._requestChunkSize = 10;         // This is the no. of records GUI requests for a single request from DBAPI 
    this._listTotalCount = 0;             // Total no of items that are available 
    this._listActualDataCount = 0;        // No o f items that are actually fetched and populated in the list
    this._listCurrentOffset = 0;         // Value from DBAPI response
    this._listNeedDataOffsetIndex = 0;  // Value from list need data Callback   
    
    //DEVICES TAB
    this._DevicesTabCtxtDataList = {
        itemCountKnown : true,
        itemCount : 2,
        items: [
            // Note: appData values here are the EventIds that will be sent to MMUI on item selection
            { appData : 'SelectBluetooth', text1Id : 'Bluetooth',   itemStyle : 'style01', hasCaret : false },
            { appData : 'SelectNetworkManagement', text1Id : 'NetworkManagement',   itemStyle : 'style01', hasCaret : false },
        ]
    };
    
    //DISPLAY TAB
    this._DisplayTabCtxtDataList = {
        itemCountKnown : true,
        itemCount : 6,
        items: [ 
            { appData : 'SelectDisplayOff', text1Id : 'TurnDisplayOff', itemStyle : 'style01' , hasCaret : false },
            { appData : 'SelectDisplayClock', text1Id : 'TurnDisplayOffShowClock', itemStyle : 'style01' , hasCaret : false },
            { appData : 'DayNightAuto', text1Id : 'Mode', button1Id : "common.Auto", button2Id : "Day", button3Id : "Night", itemStyle : 'style11', value : 1, hasCaret : false },
            
            { appData : 'SetBrightness', text1Id : 'Brightness', hasCaret : false, itemStyle : 'style12', labelLeft: "-", labelCenter: "0", labelRight : "+", value : 0, increment: 1, min:-5, max: 5 }, 
            { appData : 'SetContrast', text1Id : 'Contrast', hasCaret : false, itemStyle : 'style12', labelLeft: "-", labelCenter: "0", labelRight : "+", value : 0, increment: 1, min:-5, max: 5 }, 
            
            { appData : 'DisplaySettingsResetConf', text1Id : 'Reset',   itemStyle : 'style01' , hasCaret : false },
        ]
    };
    
    //SYSTEM TAB
    this._SystemTabCtxtDataList = {
                itemCountKnown : true,
                itemCount : 0, 
                items: []
            };
    
    this._SystemTabHelperArray = 
    {
        "toolTips" :
        { 
            "index" : 0,
        },
        "language" : 
        { 
            "index" : 1,
        },
        "temperature" : 
        { 
            "index" : 2,
            "display" : 0 //not available
        },
        "distance" : 
        { 
            "index" : 3,
            "display" : 0 //not available
        },
        "musicDatabaseUpdate" : 
        { 
            "index" : 4,
        },
        "factoryReset" : 
        { 
            "index" : 5,
        },
        "about" : 
        { 
            "index" : 6,
        }
    }
    
    //CHOOSE LANGUAGE 
    this._ChangeLanguageCtxtDataList = {
        itemCountKnown : true,
        itemCount : 0,
        items: [ ]
        };
        
    this._cachedLanguagesList = [
            { languageID : 'LANGS_US_ENGLISH', "vrSupport":true, "ttsSupport":true },
            { languageID : 'LANGS_NA_SPANISH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_CN_FRENCH', "vrSupport":true, "ttsSupport":false },
            { languageID : 'LANGS_UK_ENGLISH',"vrSupport":false, "ttsSupport":false },
            { languageID : 'LANGS_FR_FRENCH' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_DE_GERMAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_IT_ITALIAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_PT_PORTUGUESE', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_SP_SPANISH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_NL_DUTCH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_DA_DANISH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_RU_RUSSIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_SW_SWEDISH' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_FI_FINNISH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_AU_ENGLISH' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_GCC_ARABIC' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_TW_CHINESE' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_CN_CHINESE' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_MN_CHINESE' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_CH_CANTONESE', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_JA_JAPANESE', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_BR_PORTUGUESE' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_KO_KOREAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_NO_NORWEGIAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_CZ_CZECH', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_SK_SLOVAK', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_HU_HUNGARIAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_TR_TURKISH' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_PL_POLISH' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_HB_HEBREW', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_GR_GREEK' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_RO_ROMANIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_ET_ESTONIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_LV_LATVIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_LT_LITHUANIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_CN_CROATIAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_BG_BULGARIAN', "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_SE_SERBIAN' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_BS_MALAYSIA' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_TH_THAI' , "vrSupport":false, "ttsSupport":true },
            { languageID : 'LANGS_IN_INDONESIA' , "vrSupport":false, "ttsSupport":true },
            //{ languageID : 'LANGS_ML_MALAY' , "vrSupport":false, "ttsSupport":true },
            //{ languageID : 'LANGS_ADR_ENGLISH' , "vrSupport":false, "ttsSupport":true },
        ];
        
    this._AboutCtxtDataList = {
        itemCountKnown : true,
        itemCount : 2,
        items: [ 
            { appData : 'SelectAgreementsAndDisclaimers', text1Id : 'AgreementsAndDisclaimers', itemStyle : 'style01' , hasCaret : false},
            { appData : 'SelectVersion', text1Id : 'VersionInfo', itemStyle : 'style01' , hasCaret : false},
        ]
    }
   
   //CLOCK Tab 
   this._ClockTabCtxtDataList = { 
        itemCountKnown : true,
        itemCount : 4,
        items: [ 
            { appData : 'SelectSetClock', text1Id : 'AdjustTime',   itemStyle : 'style01' , hasCaret : false },
            { appData : 'SetGpsSync', text1Id : 'GPSSync', itemStyle : 'styleOnOff', value : 2, hasCaret : false }, 
            { appData : 'SetTimeFormat', text1Id : 'TimeFormat', button1Id : "_12h", button2Id : "_24h", itemStyle : 'style10', value : 2, hasCaret : false }, 
            { appData : 'SelectTimeZone', text1Id : 'TimeZoneSelect',   label1 : 'Eastern', itemStyle : 'style06' },
        ]
    };
    
    //SELECT DATE FORMAT
    this._SelectDateFormatCtxtDataList = {
        itemCountKnown : true,
        itemCount : 3,
        items: [ 
            { appData : 'SetDateFormat', text1Id : 'mm_dd_yy',   itemStyle : 'style01' },
            { appData : 'SetDateFormat', text1Id : 'dd_mm_yy',  disabled : true, itemStyle : 'style01' },
            { appData : 'SetDateFormat', text1Id : 'yy_mm_dd',   itemStyle : 'style01' },
        ]
    };

    //SELECT TIMEZONE
    this._SelectTimeZoneCtxtDataList = {
        itemCountKnown : true,
        itemCount : 100,
        items: [ 
            { appData : 'SetTimeZone', text1Id : 'UTCm1200InternationalDateLineWest',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTCm1100CoordinatedUniversalTime11',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm1000Hawaii',   itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0900Alaska',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0800BajaCalifornia',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0800PacificTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0700Arizona',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTCm0700Chihuahua',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0700MountainTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0600CentralAmerica',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0600CentralTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0600Guadalajara',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0600Saskatchewan',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0500Bogota',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0500EasternTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0500Indiana',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0430Caracas',   itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0400Asuncion',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTCm0400AtlanticTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0400Cuiaba',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0400Georgetown',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0400Santiago',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0330Newfoundland',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300Brasilia',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300BuenosAires',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300Cayenne',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300Greenland',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300Montevideo',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0300Salvador',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0200CoordinatedUniversalTime02',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0200MidAtlantic',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0100Azores',   itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTCm0100CapeVerdeIs',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0000Casablanca',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0000CoordinatedUniversalTime',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0000Dublin',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0000Monrovia',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0100Amsterdam',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0100Belgrade',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0100Brussels',   itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0100Sarajevo',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0100WestCentralAfrica',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0100Windhoek',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Athens',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Beirut',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Cairo',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Damascus',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200EEurope',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Harare',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Helsinki',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Istanbul',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0200Jerusalem',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0300Amman',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0300Baghdad',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0300Kaliningrad',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0300Kuwait',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0300Nairobi',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0330Tehran',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400AbuDhabi',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400Baku',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400Moscow',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400PortLouis',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400Tbilisi',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0400Yerevan',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0430Kabul',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0500Islamabad',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0500Tashkent',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0530Chennai',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0530SriJayawardenepura',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0545Kathmandu',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0600Astana',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0600Dhaka',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0600Ekaterinburg',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0630Yangon',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0700Bangkok',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0700Novosibirsk',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0800Beijing',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0800Krasnoyarsk',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0800KualaLumpur',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0800Perth',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0800Taipei',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0800Ulaanbaatar',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0900Irkutsk',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0900Osaka',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0900Seoul',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC0930Adelaide',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC0930Darwin',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1000Brisbane',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC1000Canberra',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1000Guam',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1000Hobart',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1000Yakutsk',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1100SolomonIs',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1100Vladivostok',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1200Auckland',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1200CoordinatedUniversalTime12',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1200Fiji',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1200Magadan',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
            { appData : 'SetTimeZone', text1Id : 'UTC1300NukuAlofa',  itemStyle : 'style03' , hasCaret : false , image1: 'radio', checked : false},
            { appData : 'SetTimeZone', text1Id : 'UTC1300Samoa',  itemStyle : 'style03' , hasCaret : false, image1: 'radio', checked : false },
        ]
    };
    
    //Communication Settings
    this._CommunicationSettingsCtxtDataList = {
        itemCountKnown : true,
        itemCount : 0,
        items: []
    };
    
    //index is used only in populate and not in message handlers as all values are static
    this._CommunicationSettingsHelperArray = 
    {
        //These indices are always static.
        "bluetooth" :
        { 
            "index" : 0,
        },
        "incomingCallNotify" : 
        { 
            "index" : 1,
        },
        "downloadCallText" : 
        { 
            "index" : 2,
        },
        "smsNotify" : 
        { 
            "index" : 3,
        },
        "downloadCallEmail" : 
        { 
            "index" : 4,
        },
        "emailNotify" : 
        { 
            "index" : 5,
        },        
        "downloadCallHistory" : 
        { 
            "index" : 6,
        },
        "downloadCallContacts" : 
        { 
            "index" : 7,
        },        
        "ringtone" :
        { 
            "index" : 8,
        },
        "phoneVolume" : 
        { 
            "index" : 9,
        },
        "vrVolume" : 
        { 
            "index" : 10,
        },
        "contactsSortOrder" : 
        { 
            "index" : 11,
        },
        "presetMessages" : 
        { 
            "index" : 12,
        }, 
        "mobileEmergency" : 
        { 
            "index" : 13,
            "display" : "Unavailable" //not available
        },
        "reset" : 
        { 
            "index" : 14,
        }
    }
   
   //CONTACT SORT ORDER
   this._ContactsSortOrderCtxtDataList = { 
        itemCountKnown : true,
        itemCount : 2,
        items: [ 
            { appData : 'SelectSortOrder', image1: 'radio', checked : true, text1Id : 'FirstLast',  itemStyle : 'style03' , hasCaret : false },
            { appData : 'SelectSortOrder', image1: 'radio', checked : false, text1Id :'LastFirst',  itemStyle : 'style03' , hasCaret : false }, 
        ]
    };
    
    //PRESET MESSAGES
    this._PresetMessagesCtxtDataList = {
        itemCountKnown : true,
        itemCount : 0,
        items: []
    };
    
    this.KEYBOARD_LANG_CODES = {
        "LANGS_KB_US_ENGLISH"                   : "en_US",               /* US (North American) English */
        "LANGS_KB_AU_ENGLISH"                   : "en_US",               /* Austrailian English */
        "LANGS_KB_NA_SPANISH"                   : "es_MX",               /* North American Spanish */
        "LANGS_KB_CN_FRENCH"                    : "fr_CN",               /* Canadian (North American) French */
        "LANGS_KB_UK_ENGLISH"                   : "en_UK",               /* UK English */
        "LANGS_KB_FR_FRENCH"                    : "fr_FR",               /* European French */
        "LANGS_KB_DE_GERMAN"                    : "de_DE",               /* German */
        "LANGS_KB_IT_ITALIAN"                   : "it_IT",               /* Italian */
        "LANGS_KB_PT_PORTUGUESE"                : "pt_PT",               /* European Portuguese */
        "LANGS_KB_BR_PORTUGUESE"                : "pt_PT",               /* Brazilian Portuguese */
        "LANGS_KB_SP_SPANISH"                   : "es_ES",               /* Castilian (European) Spanish */
        "LANGS_KB_NL_DUTCH"                     : "nl_NL",               /* Dutch */
        "LANGS_KB_DA_DANISH"                    : "da_DK",               /* Danish */
        "LANGS_KB_RU_RUSSIAN"                   : "ru_RU",               /* Russian */
        "LANGS_KB_SW_SWEDISH"                   : "sv_SE",               /* Swedish */
        "LANGS_KB_FI_FINNISH"                   : "fi_FI",               /* Finnish */
        "LANGS_KB_NO_NORWEGIAN"                 : "no_NO",               /* Norwegian */
        "LANGS_KB_CZ_CZECH"                     : "cs_CS",               /* Czech Republic */
        "LANGS_KB_SK_SLOVAK"                    : "sk_SK",               /* Slovakia */
        "LANGS_KB_HU_HUNGARIAN"                 : "hu_HU",               /* Hungarian */
        "LANGS_KB_TR_TURKISH"                   : "tr_TR",               /* Turkish */   
        "LANGS_KB_PL_POLISH"                    : "pl_PL",               /* Polish */
        "LANGS_KB_CN_CHINESE"                   : "zh_CN",               /* Simplified Chinese */
        "LANGS_KB_TW_CHINESE"                   : "zh_TW",               /* Traditional Chinese */
        "LANGS_KB_JA_JAPANESE"                  : "ja_JP",               /* Japanese */
        "LANGS_KB_GCC_ARABIC"                   : "ar_SA",               /* Arabic */
        "LANGS_KB_HB_HEBREW"                    : "he_IL",               /* Hebrew */
        "LANGS_KB_GR_GREEK"                     : "el_GR",               /* Greek */
        "LANGS_KB_RO_ROMANIAN"                  : "ro_RO",               /* Romanian */
        "LANGS_KB_ET_ESTONIAN"                  : "et_EE",               /* Estonian */
        "LANGS_KB_LV_LATVIAN"                   : "lv_LV",               /* Latvian */
        "LANGS_KB_LT_LITHUANIAN"                : "lt_LT",               /* Lithuanian */
        "LANGS_KB_CN_CROATIAN"                  : "hr_HR",               /* Croatian */
        "LANGS_KB_BG_BULGARIAN"                 : "bg_BG",               /* Bulgarian */
        "LANGS_KB_SE_SERBIAN"                   : "sr_RS",               /* Serbian */
        "LANGS_KB_BS_MALAYSIA"                  : "ms_MY",               /* Bahasa Malaysia */
        "LANGS_KB_TH_THAI"                      : "th_TH",               /* Thai */
        "LANGS_KB_IN_INDONESIA"                 : "id_ID",               /* Indonesia */
        "LANGS_KB_TW_MANDARIN"                  : "mn_TW",               /* Taiwanese */
        "LANGS_KB_CH_CANTONESE"                 : "cn_HK",               /* Cantonese Chinese */
		"LANGS_KB_HK_CANTONESE"                 : "cn_HK",               /* Hong Kong Cantonese */
        "LANGS_KB_ABC_ENGLISH"                  : "ABC",                 /* Latin Alphabet */
        "LANGS_KB_ABC_US_ENGLISH"               : "en_US_ABC",
        "LANGS_KB_ABC_NA_SPANISH"               : "es_MX_ABC",
        "LANGS_KB_ABC_CN_FRENCH"                : "fr_CN_ABC",
        //"LANGS_KB_ABC_MN_CHINESE"             : "",
        "LANGS_KB_ABC_UK_ENGLISH"               : "en_UK_ABC",
        "LANGS_KB_ABC_JA_JAPANESE"              : "ja_JP_ABC",
        "LANGS_KB_ABC_BR_PORTUGUESE"            : "pt_PT_ABC",
        "LANGS_KB_ABC_SP_SPANISH"               : "es_ES_ABC",
        "LANGS_KB_ABC_FR_FRENCH"                : "fr_FR_ABC",
        "LANGS_KB_ABC_IT_ITALIAN"               : "it_IT_ABC",
        "LANGS_KB_ABC_DE_GERMAN"                : "de_DE_ABC",
        "LANGS_KB_ABC_NL_DUTCH"                 : "nl_NL_ABC",
        "LANGS_KB_ABC_PT_PORTUGUESE"            : "pt_PT_ABC",
        "LANGS_KB_ABC_AU_ENGLISH"               : "en_AU_ABC",
        "LANGS_KB_ABC_RU_RUSSIAN"               : "ru_RU_ABC",
        "LANGS_KB_ABC_FI_FINNISH"               : "fi_FI_ABC",
        "LANGS_KB_ABC_SW_SWEDISH"               : "sv_SE_ABC",
        "LANGS_KB_ABC_DA_DANISH"                : "da_DK_ABC",
        //"LANGS_KB_ABC_KO_KOREAN"              : "",
        "LANGS_KB_ABC_TW_CHINESE"               : "zh_TW_ABC",
        "LANGS_KB_ABC_CN_CHINESE"               : "zh_CN_ABC",
        //"LANGS_KB_ABC_CH_CANTONESE"           : "",
        "LANGS_KB_ABC_GCC_ARABIC"               : "ar_SA_ABC",
        "LANGS_KB_ABC_CZ_CZECH"                 : "cs_CS_ABC",
        "LANGS_KB_ABC_HU_HUNGARIAN"             : "hu_HU_ABC",
        "LANGS_KB_ABC_NO_NORWEGIAN"             : "no_NO_ABC",
        "LANGS_KB_ABC_PL_POLISH"                : "pl_PL_ABC",
        "LANGS_KB_ABC_SK_SLOVAK"                : "sk_SK_ABC",
        "LANGS_KB_ABC_TR_TURKISH"               : "tr_TR_ABC",
        "LANGS_KB_ABC_ET_ESTONIAN"              : "et_EE_ABC",
        "LANGS_KB_ABC_LV_LATVIAN"               : "lv_LV_ABC",
        "LANGS_KB_ABC_LT_LITHUANIAN"            : "lt_LT_ABC",
        "LANGS_KB_ABC_GR_GREEK"                 : "el_GR_ABC",
        "LANGS_KB_ABC_CN_CROATIAN"              : "hr_HR_ABC",
        "LANGS_KB_ABC_BG_BULGARIAN"             : "bg_BG_ABC",
        "LANGS_KB_ABC_RO_ROMANIAN"              : "ro_RO_ABC",
        "LANGS_KB_ABC_SE_SERBIAN"               : "sr_RS_ABC",
        "LANGS_KB_ABC_HB_HEBREW"                : "he_IL_ABC",
        "LANGS_KB_ABC_BS_MALAYSIA"              : "ms_MY_ABC",
        //"LANGS_KB_ABC_ML_MALAY"               : "",
        "LANGS_KB_ABC_IN_INDONESIA"             : "id_ID_ABC",
        "LANGS_KB_ABC_TH_THAI"                  : "th_TH_ABC",
        //"LANGS_KB_NO_VR"                      : ""
        };
    
    //SELECT KEYBOARD LANGUAGE 
    this._KeyboardLanguageCtxtDataList = {
        itemCountKnown : true,
        itemCount : 0,
        items: [ ]
        };

    this._cachedRecentKeyboardLanguagesList =
    [
    ]
    
    this._cachedKeyboardLanguagesList = 
    [
        ,"LANGS_KB_US_ENGLISH"  
        ,"LANGS_KB_NA_SPANISH"  
        ,"LANGS_KB_CN_FRENCH"  
        ,"LANGS_KB_UK_ENGLISH"  
        ,"LANGS_KB_FR_FRENCH" 
        ,"LANGS_KB_DE_GERMAN" 
        ,"LANGS_KB_IT_ITALIAN"   
        ,"LANGS_KB_PT_PORTUGUESE"  
        ,"LANGS_KB_SP_SPANISH"  
        ,"LANGS_KB_NL_DUTCH"  
        ,"LANGS_KB_DA_DANISH"  
        ,"LANGS_KB_RU_RUSSIAN"  
        ,"LANGS_KB_SW_SWEDISH"  
        ,"LANGS_KB_FI_FINNISH"  
        ,"LANGS_KB_NO_NORWEGIAN"  
        ,"LANGS_KB_CZ_CZECH"  
        ,"LANGS_KB_SK_SLOVAK"  
        ,"LANGS_KB_HU_HUNGARIAN"  
        ,"LANGS_KB_TR_TURKISH"     
        ,"LANGS_KB_PL_POLISH"  
        ,"LANGS_KB_CN_CHINESE"  
        ,"LANGS_KB_TW_CHINESE"  
        ,"LANGS_KB_JA_JAPANESE"  
        ,"LANGS_KB_GCC_ARABIC"  
        ,"LANGS_KB_HB_HEBREW"  
        ,"LANGS_KB_GR_GREEK"  
        ,"LANGS_KB_RO_ROMANIAN"  
        ,"LANGS_KB_ET_ESTONIAN"  
        ,"LANGS_KB_LV_LATVIAN"  
        ,"LANGS_KB_LT_LITHUANIAN"  
        ,"LANGS_KB_CN_CROATIAN"  
        ,"LANGS_KB_BG_BULGARIAN"  
        ,"LANGS_KB_SE_SERBIAN"  
        ,"LANGS_KB_BS_MALAYSIA"   
        ,"LANGS_KB_TH_THAI"  
        ,"LANGS_KB_IN_INDONESIA"  
        ,"LANGS_KB_ABC_ENGLISH" 
        ,"LANGS_KB_BR_PORTUGUESE"
        ,"LANGS_KB_AU_ENGLISH"
        //Those below do not have corresponding code in Keyboard Control
        ,"LANGS_KB_HEX"
        ,"LANGS_KB_NUMERIC" 
        ,"LANGS_KB_ML_MALAY"
        ,"LANGS_KB_ADR_ENGLISH"
        ,"LANGS_KB_MN_CHINESE"
        ,"LANGS_KB_CH_CANTONESE"
        ,"LANGS_KB_KO_KOREAN"
        //ABC
        ,"LANGS_KB_ABC_US_ENGLISH"
        ,"LANGS_KB_ABC_NA_SPANISH"
        ,"LANGS_KB_ABC_CN_FRENCH"
        ,"LANGS_KB_ABC_UK_ENGLISH"
        ,"LANGS_KB_ABC_JA_JAPANESE"
        ,"LANGS_KB_ABC_BR_PORTUGUESE"
        ,"LANGS_KB_ABC_SP_SPANISH"
        ,"LANGS_KB_ABC_FR_FRENCH"
        ,"LANGS_KB_ABC_IT_ITALIAN"
        ,"LANGS_KB_ABC_DE_GERMAN"
        ,"LANGS_KB_ABC_NL_DUTCH"
        ,"LANGS_KB_ABC_PT_PORTUGUESE"
        ,"LANGS_KB_ABC_AU_ENGLISH"
        ,"LANGS_KB_ABC_RU_RUSSIAN"
        ,"LANGS_KB_ABC_FI_FINNISH"
        ,"LANGS_KB_ABC_SW_SWEDISH"
        ,"LANGS_KB_ABC_DA_DANISH"
        ,"LANGS_KB_ABC_TW_CHINESE"
        ,"LANGS_KB_ABC_CN_CHINESE"
        ,"LANGS_KB_ABC_GCC_ARABIC"
        ,"LANGS_KB_ABC_CZ_CZECH"
        ,"LANGS_KB_ABC_HU_HUNGARIAN"
        ,"LANGS_KB_ABC_NO_NORWEGIAN"
        ,"LANGS_KB_ABC_PL_POLISH"
        ,"LANGS_KB_ABC_SK_SLOVAK"
        ,"LANGS_KB_ABC_TR_TURKISH"
        ,"LANGS_KB_ABC_ET_ESTONIAN"
        ,"LANGS_KB_ABC_LV_LATVIAN"
        ,"LANGS_KB_ABC_LT_LITHUANIAN"
        ,"LANGS_KB_ABC_GR_GREEK"
        ,"LANGS_KB_ABC_CN_CROATIAN"
        ,"LANGS_KB_ABC_BG_BULGARIAN"
        ,"LANGS_KB_ABC_RO_ROMANIAN"
        ,"LANGS_KB_ABC_SE_SERBIAN"
        ,"LANGS_KB_ABC_HB_HEBREW"
        ,"LANGS_KB_ABC_BS_MALAYSIA"
        ,"LANGS_KB_ABC_IN_INDONESIA"
        ,"LANGS_KB_ABC_TH_THAI"
        //Those below do not have corresponding code in Keyboard Control
        ,"LANGS_KB_ABC_KO_KOREAN" 
        ,"LANGS_KB_ABC_MN_CHINESE"
        ,"LANGS_KB_ABC_CH_CANTONESE"
        ,"LANGS_KB_ABC_ML_MALAY"
        ,"LANGS_KB_NO_VR"
        ]
            
    ////Tabs Config
    //TabsConfig value with HUD
    this._tabsConfig = 
    [
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.HUDTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "HUD"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DisplayTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Display"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Safety",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Safety"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SoundTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Sound" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Clock",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Clock" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.VehicleTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Vehicle"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DevicesTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Devices"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SystemTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "System"
        }
    ]
    
    //TabsConfig value without HUD
    this._tabsConfigNoHUD = 
    [ 
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DisplayTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Display"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Safety",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Safety"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SoundTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Sound" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "Clock",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Clock" 
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.VehicleTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Vehicle"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.DevicesTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "Devices"
        },
        {
            "selectCallback" : this.tabClick,
            "label"         : null,
            "labelId"       : "common.SystemTab",
            "subMap"        : null,
            "tabStyle" : "tabsStyle2",
            "appData" : "System"
        }
    ]


    //@formatter:off
    this._messageTable = {
        //Display
        "Display" : this._DisplayMsgHandler.bind(this),
        "DayNightMode" : this._DayNightModeMsgHandler.bind(this),
        "Brightness" : this._BrightnessMsgHandler.bind(this),
        "Contrast" : this._ContrastMsgHandler.bind(this),
        "SendDisplaySettingsResetProgress" : this._SendDisplaySettingsResetProgressMsgHandler.bind(this),
        "DisplayOverTemperature" : this._DisplayOverTemperatureMsgHandler.bind(this),
        "DisplaySetResetSuccess" : this._DisplayResetMsgHandler.bind(this), 
        "DisplaySetResetFailure" : this._DisplayResetMsgHandler.bind(this),
        
        //System
        "ToolTips" : this._ToolTipsMsgHandler.bind(this),
        "TemperatureUnit_Installed" : this._TemperatureUnit_InstalledMsgHandler.bind(this),
        "DistanceUnit_Installed" : this._DistanceUnit_InstalledMsgHandler.bind(this),
        "Temperature" : this._TemperatureMsgHandler.bind(this),
        "Distance" : this._DistanceMsgHandler.bind(this),
        "LanguagesList" : this._LanguagesListMsgHandler.bind(this),
        "LanguageChanged" : this._LanguageChangedMsgHandler.bind(this),
        "LanguageSupported" : this._LanguageSupportedMsgHandler.bind(this),
        "SendLanguageChangeProgress" : this._SendLanguageChangeProgressMsgHandler.bind(this),  
        "SendFactoryResetProgress" : this._SendFactoryResetProgressMsgHandler.bind(this),  
        "SelectLanguageSuccess" : this._SelectLanguageMsgHandler.bind(this), 
        "SelectLanguageError" : this._SelectLanguageMsgHandler.bind(this), 
        // ADD LanguageChangeStatus

        //ClockTab
        "GPSSync" : this._GPSSyncMsgHandler.bind(this),
        "TimeFormat" : this._TimeFormatMsgHandler.bind(this),
        "TimeZone" : this._TimeZoneMsgHandler.bind(this),
        "SendCurrentTimeEpoch" : this._SendCurrentTimeEpochMsgHandler.bind(this),
        "TimeZoneList" : this._TimeZoneListMsgHandler.bind(this),
        "DateFormat" : this._DateFormatMsgHandler.bind(this),
        "DayLightSavingsTime" : this._DayLightSavingsTimeMsgHandler.bind(this),
        "SetHoldButtonInterval" : this.setHoldButtonIntervalMessageHandler.bind(this), 
        "MeridiamTime" : this._MeridiamTimeMsgHandler.bind(this),
        "NaviStatus" : this._NaviStatusMsgHandler.bind(this),
        
        //CommunicationSettings
        "SMSNotify" : this._SMSNotificationMsgHandler.bind(this),
        "EmailNotify" : this._EmailNotificationMsgHandler.bind(this),
        "IncomingCallNotification" : this._IncomingCallNotificationMsgHandler.bind(this),
        "AutoDownloadCallHistory" : this._AutoDownloadCallHistoryMsgHandler.bind(this),
        "AutoDownloadContacts" : this._AutoDownloadContactsMsgHandler.bind(this),
        "AutoDownloadText" : this._AutoDownloadTextMsgHandler.bind(this),
        "AutoDownloadEmail" : this._AutoDownloadEmailMsgHandler.bind(this),
        "RingToneType" : this._RingToneTypeMsgHandler.bind(this),
        "PhoneVolumeControl" : this._PhoneVolumeControlMsgHandler.bind(this),
        "HandsfreeVolumeSetting" : this._HandsfreeVolumeSettingMsgHandler.bind(this),
        "VR_RingtoneVolumeControl" : this.VR_RingtoneVolumeControlMsgHandler.bind(this),
        "RingtoneAndVRVolumeSetting" : this._RingtoneAndVRVolumeSettingMsgHandler.bind(this),
        "ContactsSortOrder" : this._ContactsSortOrderMsgHandler.bind(this),
        "MobilePhone911SettingAvailableUnavailable" : this._MobilePhone911SettingAvailableUnavailableMsgHandler.bind(this),
        "MobileEmergencyNumber" : this._MobileEmergencyNumberMsgHandler.bind(this),
        "PresetMessagesList" : this._PresetMessagesListMsgHandler.bind(this),
        "SaveMessageStatus" : this._SaveMessageStatusMsgHandler.bind(this),
        "KeyboardLanguagesList" : this._KeyboardLanguagesListMsgHandler.bind(this),
        "RecentKeyboardLanguagesList" : this._recentKeyboardLanguagesListMsgHandler.bind(this),
        "RecentKeyboardNumber" : this._RecentKeyboardNumberMsgHandler.bind(this),
        "MaxRecentKeyboardNumber" : this._MaxRecentKeyboardNumberMsgHandler.bind(this),
        "KeyboardLanguage" : this._KeyboardLanguageMsgHandler.bind(this),
        
        //Other
        "Region" : this._RegionMsgHandler.bind(this),
        "Destination" : this._DestinationMsgHandler.bind(this),
        "Global.AtSpeed" : this._AtSpeedMsgHandler.bind(this),
        "Global.NoSpeed" : this._NoSpeedMsgHandler.bind(this),
        
        //VehcileType
        "VehicleType" : this._vehicleTypeMsgHandler.bind(this),

    }; // end of this._messageTable 
    //@formatter:on

    //Context table
    //@formatter:off
    this._contextTable = { 
        "DevicesTab" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList":  null,
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":5, "tabsConfig": this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,
                    "smallItemText" : true,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._DevicesTabCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
            "contextInFunction" : this._DevicesTabCtxtIn.bind(this),
        }, // end of "DevicesTab"
        
        "DisplayTab" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._DisplayTabCtxtDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style06', 
                        image1: 'apps/syssettings/images/SettingsTestImage.png',
                    },  
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":0, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,
                    slideCallback : this.listItemSlide, 
                    "smallItemText" : true,
                    "minChangeInterval" : 1000,
                    "rotationIdleDetectTime" : 1250,
                    "settleTime" : 1500,
                    "toggleMinChangeInterval" : 1000,
                    "toggleSettleTime" : 1500,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
               "readyFunction" : this._DisplayTabCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this._syssettingsCtxtTmpltDisplayed.bind(this)
               "contextInFunction" : this._DisplayTabCtxtIn.bind(this),
        }, // end of "DisplayTab"
        
        "DisplaySettingsReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'DisplayResetConfText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._DisplaySettingsResetCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "DisplaySettingsReset"
        
        "DisplaySettingsResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle  : "style14",  
                    "fullScreen" : true,
                    text1Id : 'DisplayResetProgressText',    
                     "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._DisplaySettingsResetProgressCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "DisplayResetProgress"
        
        "DisplaySettingsResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'DisplayResetErrorText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._DisplaySettingsResetErrorCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "DisplayResetError"
  
        "SystemTab" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._SystemTabCtxtDataList, 
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":6, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,
                    "smallItemText" : true,
                    "rotationIdleDetectTime" : 1250,
                    "toggleMinChangeInterval" : 1000,
                    "toggleSettleTime" : 1500,
                } // end of properties for "List2Ctrl"                                       
            }, // end of list of controlProperties
              "readyFunction" : this._SystemTabCtxtTmpltReadyToDisplay.bind(this),
              "contextInFunction" : this._SystemTabCtxtIn.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "SystemTab"
        
        "FactoryResetConfirm" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    "defaultSelectCallback" : this._dialogDefaultSelectCallback.bind(this),
                    "contentStyle" : "style02",
                    "fullScreen" : true,
                    "buttonCount" : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'FactoryResetConfText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._FactoryResetConfirmCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "FactoryResetConfirm"
        
        "FactoryResetProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle  : "style14",  
                    "fullScreen" : true,
                    text1Id : 'FactoryResetProgressText',    
                     "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._FactoryResetProgressCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "FactoryResetProgress"
        
        "About" : {
            "template" : "List2Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._AboutCtxtDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        text1Id : 'About',
                        titleStyle : 'style02' 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null   // Not needed, no dynamic list data
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._AboutCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "About"
        
        "AgreementsDisclaimers" : {
            "template" : "ScrollDetailTmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "ScrollDetailCtrl" : {
                    defaultSelectCallback :  this.scrollDetailClick,
                    controlStyle : "style1",
                    scrollDetailTitleId : "AgreementsAndDisclaimers",
                    scrollDetailBodyId : "AgreementsDisclaimersText",
                    "scrollDetailBodyPath" : "apps/syssettings/js/legalDisclosure.js",
                }, // end of properties for "ScrollDetailCtrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._AgreementsDisclaimersCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,       
            "displayedFunction": null
        }, // end of "AgreementsDisclaimers"
        
        "ChangeLanguage" : {
            "template" : "List2Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList":  this._ChangeLanguageCtxtDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'ChooseLanguage', 
                    }, 
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,  
                    needDataCallback : null,   // Not needed, no dynamic list data
                    //"checkMinChangeInterval" : 1000, Not used as tick is not implemented by index but language id.
                    //"checkSettleTime" : 1500,
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._ChangeLanguageCtxtTmpltReadyToDisplay.bind(this),
            //"displayedFunction" : this._ChangeLanguageCtxtDisplayed.bind(this),
        }, // end of "ChangeLanguage"
        
        "LanguageConf" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'LanguageConfText',     
                    text1SubMap : {languageID : ""},       
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._LanguageConfCtxtTmpltReadyToDisplay.bind(this),
            "displayedFunction": null,  
            "noLongerDisplayedFunction": null,  
        }, // end of "LanguageConf"

        "UseUKEnglish" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'UseUKEnglishText',     
                    text1SubMap : {languageID : ""},       
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "contextInFunction" : this._UseUKEnglishCtxtIn.bind(this),
            "readyFunction" : this._UseUKEnglishCtxtTmpltReadyToDisplay.bind(this),  
        }, // end of "UseUKEnglish"
        
        "LanguageChangeProgress" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle  : "style14",  
                    "fullScreen" : true,
                    text1Id : 'LanguageChangeProgressText',     
                     "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : null,
            "contextInFunction": null,
            "noLongerDisplayedFunction": this._LanguageChangeProgressCtxtTmpltNoLongerDisplayed.bind(this),
        }, // end of "LanguageChangeProgress"
        
        "LanguageChangeError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'LanguageChangeErrorText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._LanguageChangeErrorCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "LanguageChangeError"
        
        "ClockTab" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Settings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList": this._ClockTabCtxtDataList, 
                    titleConfiguration : 'tabsTitle', 
                    tabsButtonConfig : {"style":"tabsStyle2", "defaultSelectCallback":null, "currentlySelectedTab":3, "tabsConfig":this._tabsConfig, tabsGroup : "settings"},
                    selectCallback : this.listItemClick,
                    "smallItemText" : true,
                    "rotationIdleDetectTime" : 1250,
                    "toggleMinChangeInterval" : 1000,
                    "toggleSettleTime" : 1500,
                } // end of properties for "List2Ctrl"
            }, // end of list of controlProperties
              "readyFunction" : this._ClockTabCtxtTmpltReadyToDisplay.bind(this),
              "contextInFunction" : this._ClockTabCtxtIn.bind(this)              
            // "displayedFunction": this.ctxtTmpltDisplayed
        }, // end of "ClockTab"

        "SetClock" :
        {
            "template" : "ClockSettings2Tmplt",
            "sbNameId" : "SystemSettings",
            "controlProperties" :
            {
                "ClockSettings2Ctrl" :
                {
                    "ctrlStyle"             : "style24",
                    "subMap"                : this._subMap,
                    "ctrlTitleId"            : "AdjustTime",
                    "initialTime"           : null,
                    "clockSettleTime"       : 1000,                                                 //Used locally in App. Not a control Property.
                    "timeChangedCallback"   : this.timeChangedCallback,
                    "heldButtonIntervalMs"  : this._cachedHoldButtonInterval,
                    "tooltipsEnabled"        : true
                },
            }, // end of list of controlProperties
            "readyFunction" : this._SetClockCtxtTmpltReadyToDisplay.bind(this), 
            "displayedFunction" : null,
        }, // end of "SetClock"

        "SelectTimeZone" : {
            "template" : "List2Tmplt",
            "sbNameId" : "SystemSettings",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList":  this._SelectTimeZoneCtxtDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'SelectTimeZone', 
                    },
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,
                    "rotationIdleDetectTime" : 1250,
                    "checkMinChangeInterval" : 1000,
                    "checkSettleTime" : 1500,
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._SelectTimeZoneCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "SelectTimeZone"
         
        "CommunicationSettings" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList":  this._CommunicationSettingsCtxtDataList,
                    "smallItemText" : true,
                    /* titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'CommunicationSettings', 
                    },  */
                    selectCallback : this.listItemClick,  
                    slideCallback : this.listItemSlide,
                    "minChangeInterval" : 500,
                    "rotationIdleDetectTime" : 750,
                    "settleTime" : 2000,
                    "toggleMinChangeInterval" : 1000,
                    "toggleSettleTime" : 1500,
                    "checkMinChangeInterval" : 1000,
                    "checkSettleTime" : 1500,
                    //selectDisabledCallback : function() {log.info("Disabled callback called");},
                }, // end of properties for "List2Ctrl"
            }, // end of list of controlProperties
            "readyFunction" : this._CommunicationSettingsCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed  
        }, // end of "CommunicationSettings" 
        
        "ContactsSortOrder" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {                                                            
                    "dataList":  this._ContactsSortOrderCtxtDataList,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'ContactsSortOrder', 
                    },  
                    "smallItemText" : true,
                    selectCallback : this.listItemClick,
                    "rotationIdleDetectTime" : 1250,
                    "checkMinChangeInterval" : 1000,
                    "checkSettleTime" : 1500,
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction" : this._ContactsSortOrderCtxtTmpltReadyToDisplay.bind(this),
            // "displayedFunction": this.ctxtTmpltDisplayed 
        }, // end of "ContactsSortOrder"
        
        "CommunicationSettingsReset" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'CommunicationResetConfText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._CommunicationSettingsResetCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "CommunicationSettingsReset"
        
        "CommunicationSettingsResetProg" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : { 
                    contentStyle  : "style14",  
                    "fullScreen" : true,
                    text1Id : 'CommunicationResetProgressText',   
                     "meter" : {"meterType":"indeterminate", "meterPath":"common/images/IndeterminateMeter.png"},  
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._CommunicationSettingsResetProgCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "CommunicationSettingsResetProg"
        
        "CommunicationSettingsResetError" : {
            "template" : "Dialog3Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "Dialog3Ctrl" : {
                    contentStyle  : "style02", 
                    "fullScreen" : true,
                    defaultSelectCallback :  this._dialogDefaultSelectCallback.bind(this),
                    buttonCount : 2,
                    buttonConfig : {
                        button1 : {
                            labelId : "common.No", 
                            appData : "Global.No" 
                        },
                        button2 : {
                            labelId : "common.Yes", 
                            appData : "Global.Yes" 
                        }
                    },
                    text1Id : 'CommunicationResetErrorRetryText',     
                } // end of properties for "Dialog3Ctrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._CommunicationSettingsResetErrorCtxtTmpltReadyToDisplay.bind(this),
            "contextInFunction" : null,           
            "displayedFunction": null
        }, // end of "CommunicationSettingsResetError"
        
        "PresetMessages" : {
            "template" : "List2Tmplt",
            "sbNameId" : "Communication",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "List2Ctrl" : {
                    "dataList":  null,
                    titleConfiguration : 'listTitle',
                    title : {
                        titleStyle : 'style02',  
                        text1Id : 'PresetMessages', 
                    }, 
                    "smallItemText" : true,
                    selectCallback : this.listItemClick  
                    //needDataCallback : this._PresetMessagesNeedDataCallback.bind(this),
                } // end of properties for "List2Ctrl"                                      
            }, // end of list of controlProperties
            "readyFunction": this._PresetMessagesCtxtTmpltReadyToDisplay.bind(this),  
            "contextInFunction" : null,      
        }, // end of "PresetMessages" 
        
        "ComposeMessage" : {
            "template" : "KeyboardTmplt",
            "sbNameId" : "EditPresetMessage",
            "leftBtnStyle" : "goBack",
            "controlProperties": {
                "KeyboardCtrl" : {
                    maxBytes : 140,
                    okBtnCallback : this._ComposeMessageOkBtnCallback.bind(this),
                    cancelBtnCallback : this._ComposeMessageCancelBtnCallback.bind(this)
                } // end of properties for "KeyboardCtrl"                                       
            }, // end of list of controlProperties
            "readyFunction" : this._ComposeMessageCtxtTmpltReadyToDisplay.bind(this),            
        }, // end of "ComposeMessage" 
        
        "KeyboardLanguage" : {
            "leftBtnStyle" : "goBack",
            "template" : "List2Tmplt",
            "sbNameId" : "SystemSettings",
            "controlProperties": {
                "List2Ctrl" : {
                    titleConfiguration : "listTitle",
                    selectCallback: this.listItemClick,
                    title : {
                        "titleStyle" : "style02",
                        "text1Id" : "SelectKBLang",
                    },
                    "smallItemText" : true,
                    dataList : this._KeyboardLanguageCtxtDataList,
                    "focussedItem" : null,
                    //"checkMinChangeInterval" : 1000, Not needed as radio is not implemented by index but kbLang Id.
                },
            },
            "readyFunction" : this._KeyboardLanguageCtxtTmpltReadyToDisplay.bind(this),
        }, // end of "KeyboardLanguage"
        
    }; // 
    //@formatter:on
    this._disableSpeedRestricted = framework.common.getAtSpeedValue();
    //Subscribe and Set values for Shared Data at initialization
    framework.subscribeToSharedData(this.uiaId, "vehsettings", "HudInstalled");
    framework.setSharedData(this.uiaId, "ToolTips", true);
    
    //Establish an AppSDK connection
    var connectionParams = 
    {
        "context_in": 0,
        "client_type_in": 3,
        "callbacks_in": 0
       
    };
    framework.sendRequestToAppsdk(this.uiaId, this._ConnectionValueCallbackFn.bind(this), "msg", "Connect", connectionParams);
    log.debug("Connection Request sent to APPSDK from uiaId: " +this.uiaId);
}

/**************************
 * Set Wink Properties *
 **************************/

syssettingsApp.prototype.getWinkProperties = function(alertId, params)
{
    log.debug("setting wink properties for: ", alertId, params);
    var winkProperties = null;
    switch(alertId)
    {
        case "LanguageChanged_Alert":
            winkProperties = {
                "style": "style03",
                "text1Id": "LanguageChangeSuccess",
                "text1SubMap": {"languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguageSupported)},
            };
            break;
        default:
            // Display default Wink
            log.debug("No properties found for wink: " + alertId);
            break;
    }
    // return the properties to Common
    return winkProperties;
}
 
/**************************
 * App Functions *
 **************************/
/*
 * Callback function to received the updated clock settings.  This function will be called
 * whenever the clock settings change, e.g. when a UMP +/- button is selected, or held & released,
 * or the AM/PM button is pressed (for 12-hour clocks).  The application is expected to use MMUI
 * commands to communicate with low-level services for setting the system time.
 *
 * Parameters:
 *  updatedDateTime - a Date object, with the .hours (0-23) and .minutes (0-59) fields set to the updated time.
 */
syssettingsApp.prototype._timeChangedCallback = function(clock2ctrl, appData, params)
{
    var updatedDateTime = params.updatedDateTime;
    var hours = updatedDateTime.getHours();
    log.debug("_timeChangedCallback called, updatedDateTime: " + hours + ":" + updatedDateTime.getMinutes());
    //Send timestamp
    this._cachedCurrentTime = Math.round(updatedDateTime / 1000.0);
    var updatedU32timestamp =  {payload: {u32TimestampSec: this._cachedCurrentTime}};
    framework.sendEventToMmui('syssettings', "SetTime", updatedU32timestamp);
    //Cache time when last modified by user.
    this._lastTimeChangedAt = new Date();
    clearTimeout(this._scheduledClockUpdate);
    //Update StatusBar time
    this._populateStatusBarCtrl();
}

/*
 * Handler for test harness to set the clock.
 * (This data would normally come from MMUI)
 */
syssettingsApp.prototype.setCurrentTimeMessageHandler = function(msg)
{
    log.debug("setCurrentTimeMessageHandler() called: msg.params.payload.currentTime = " + msg.params.payload.currentTime.toString());

    // Make sure we're active (operation valid in all our contexts)
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SetClock")
    {
        // Update the control to change the current time
        if (msg && msg.params && msg.params.payload && msg.params.payload.currentTime && msg.params.payload.currentTime.timestamp)
        {
            var utcMilliseconds = msg.params.payload.currentTime.timestamp * 1000;
            
            // clockSettings2Ctrl will accept either a Date Object or the current time in UTC milliseconds
            this._currentContextTemplate.clockSettings2Ctrl.setCurrentTime(utcMilliseconds);
        }
    }
}

/*
 * Handler for test harness to alter the UMP held-button update rate.
 * (This data would normally come from MMUI)
 */
syssettingsApp.prototype.setHoldButtonIntervalMessageHandler = function(msg)
{
    log.debug("setHoldButtonIntervalMessageHandler() called: msg.params.payload.holdButtonInterval = " + msg.params.payload.holdButtonInterval);

    // Update our cached hold interval
    this._cachedHoldButtonInterval = msg.params.payload.holdButtonInterval;

    // Make sure we're active (operation valid in all our contexts)
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SetClock")
    {
        // Update the control to change the rate of UMP held-button clock changes
        this._currentContextTemplate.clockSettings2Ctrl.setHoldButtonInterval(this._cachedHoldButtonInterval);
    }
}
 
// Click callback for the dialog
syssettingsApp.prototype._dialogDefaultSelectCallback = function(dialogBtnCtrlObj, appData, params)
{
    log.debug("_dialogDefaultSelectCallback  called...", dialogBtnCtrlObj.properties.label, appData);
    
    switch(this._currentContext.ctxtId)
    {
        case 'LanguageConf':
            switch(appData)
            {
                case 'Global.Yes': 
                    framework.sendEventToMmui(this.uiaId, "SetLanguage", { payload : { languageID : this._cachedLanguage} });    
                    break;
                case 'Global.No':   
                    framework.sendEventToMmui("common", appData); 
                    break;
                default:
                    log.debug("Invalid appData.");
                    break;
            }
            break;   
        case 'LanguageChangeError':
            switch(appData)
            {
                case 'Global.Yes': 
                    framework.sendEventToMmui(this.uiaId, "SetLanguage", { payload : { languageID : this._cachedLanguage} }); 
                    break;
                case 'Global.No':
                    framework.sendEventToMmui("common", appData); 
                    break;
                default:
                    log.debug("Invalid appData.");
                    break;
            }
            break;
        case 'FactoryResetConf':
        case "FactoryResetConfirm":
        case "DisplayResetConf":
        case 'DisplaySettingsReset':
        case 'DisplaySettingsResetError': 
        case "CommunicationSettingsReset":
        case "CommunicationSettingsResetError":
        case "VoiceRecognitionUKEnglish":
        case "UseUKEnglish" :
            framework.sendEventToMmui("common", appData);
            break;  
        default:
            log.debug("Dialog does not have any event.");
            break;
    }
}

syssettingsApp.prototype._menuItemSlideCallback = function(listCtrlObj, appData, params)
{
    log.debug("_menuItemSlideCallback called for context " + this._currentContext.ctxtId + " with appData : " + appData + " and params : " , params); 
    switch(appData)
    { 
        case "AdjustVRVolume":
            if (this._cachedRingtoneAndVRVolume != params.value)
            {
                var ttsString = framework.localize.getLocStr(this.uiaId, "VRVolumeTTS")
                framework.sendEventToMmui(this.uiaId, "SetVoiceGuidanceRingVolume",  { payload : { volume : params.value, promptString : ttsString} } ); 
                this._cachedRingtoneAndVRVolume = params.value;
            } 
            break; 
        case "AdjustRingtoneVolume":
            if (this._cachedHandsfreeVolume != params.value)
            {
                var ttsString = framework.localize.getLocStr(this.uiaId, "RingtoneVolumeTTS")
                framework.sendEventToMmui(this.uiaId, "SetCallVolume",  { payload : { callVolume : params.value, promptString : ttsString} } ); 
                this._cachedHandsfreeVolume = params.value;
            } 
            break; 
        case "SetBrightness":
            if (this._cachedBrightness != params.value)
            {
                framework.sendEventToMmui(this.uiaId, "SetBrightness",  { payload : { brightnessValue : params.value} } ); 
                this._cachedBrightness = params.value;
            } 
            break;  
        case "SetContrast":
            if (this._cachedContrast != params.value)
            {
                framework.sendEventToMmui(this.uiaId, "SetContrast",  { payload : { ContrastValue : params.value} } ); 
                this._cachedContrast = params.value;
            } 
            break;
    } 
}




/*
 * Callback from listCtrl when a tab button is clicked.
 */
syssettingsApp.prototype._tabClickCallback = function(btnRef, appData, params)
{ 
    log.debug(" _tabClickCallback  called...", appData); 
    framework.sendEventToMmui("common", "Global.IntentSettingsTab", { payload : { settingsTab : appData} } );    
}



/*
 * Select callback for the list menus
 * @param   listCtrlObj (Object) Reference to the list control that was clicked
 * @param   appData (Object) Item data that was passed into the list control when it was was populated
 * @param   params  (Object) Object that contains additional data about the list item that was clicked
 */ 
syssettingsApp.prototype._menuItemSelectCallback = function(listCtrlObj, appData, params)
{
    log.debug("_menuItemSelectCallback called for context " + this._currentContext.ctxtId + " with itemIndex: "+ params.itemIndex + ' appData: '+ appData + ' params.additionalData: ' + params.additionalData);
     
    switch(appData)
    {     
        //DISPLAY TAB
        case "DayNightAuto":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetDayNightAuto", { payload : { displayDayNightAuto : "Auto"} } ); 
                    this._cachedDayNightMode = "Auto";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetDayNightAuto", { payload : { displayDayNightAuto : "Day"} } ); 
                    this._cachedDayNightMode = "Day";
                    break;
                case 3:
                    framework.sendEventToMmui(this.uiaId, "SetDayNightAuto", { payload : { displayDayNightAuto : "Night"} } ); 
                    this._cachedDayNightMode = "Night";
                    break;
            };   
            break;            
        //SYSTEM TAB
        case "SetToolTips" :
            switch(params.additionalData)
            {
                case 1:
                    framework.setSharedData(this.uiaId, "ToolTips", true);
                    framework.sendEventToMmui(this.uiaId, "SetToolTips", { payload : { toolTips : "On"} } );
                    break;
                case 2:
                    framework.setSharedData(this.uiaId, "ToolTips", false);
                    framework.sendEventToMmui(this.uiaId, "SetToolTips", { payload : { toolTips : "Off"} } );
                    break;
            } 
            break; 
        case "SetUnitsTemperature":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetUnitsTemperature", { payload : { unitsTemperature : "Fahrenheit"} } ); 
                    this._cachedTemperature = "Fahrenheit";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetUnitsTemperature", { payload : { unitsTemperature : "Celsius"} } ); 
                    this._cachedTemperature = "Celsius";
                    break;
            } 
            break;   
        case "SetUnitsDistance":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetUnitsDistance", { payload : { unitsDistance : "Miles"} } ); 
                    this._cachedDistance = "Miles";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetUnitsDistance", { payload : { unitsDistance : "Kilometers"} } ); 
                    this._cachedDistance = "Kilometers";
                    break;
            }    
            break;
        //About
        case "SelectVersion":
            framework.sendEventToMmui(this.uiaId, "SelectVersion"); 
            break;
        //CLOCK TAB
        case "SetGpsSync":
            //Disabling the Adjust Time so that user cannot enter SetClock if he quickly enables GPSSync and tries to Adjust Time
            switch(params.additionalData)
            {
                case 1:
                    this._cachedGPSSync = "On";
                    this._EnableDisableClockTabItemsOnGpsSyncStatus(true);
                    framework.sendEventToMmui(this.uiaId, "SetGpsSync", { payload : { enableGpsSync : "On"} } );
                    break;
                case 2:
                    this._cachedGPSSync = "Off";
                    this._EnableDisableClockTabItemsOnGpsSyncStatus(false);
                    framework.sendEventToMmui(this.uiaId, "SetGpsSync", { payload : { enableGpsSync : "Off"} } );
                    break;
                default:
                    //do nothing
            }
            break; 
        case "SelectSetClock":
            if(this._cachedTimeFormat === "hrs12")
            {
                this._contextTable.SetClock.controlProperties.ClockSettings2Ctrl.ctrlStyle = "style12";
            }
            else if(this._cachedTimeFormat === "hrs24")
            {
                this._contextTable.SetClock.controlProperties.ClockSettings2Ctrl.ctrlStyle = "style24";
            }
            framework.sendEventToMmui(this.uiaId, "SelectSetClock"); 
            break;   
        case "SetTimeFormat":
            switch(params.additionalData)
            {
                case 1:
                    framework.localize.setTimeFormat("12hrs")
                    framework.sendEventToMmui(this.uiaId, "SetTimeFormat", { payload : { formatTime : "hrs12"} } ); 
                    this._cachedTimeFormat = "hrs12";
                    break;
                case 2:
                    framework.localize.setTimeFormat("24hrs")
                    framework.sendEventToMmui(this.uiaId, "SetTimeFormat", { payload : { formatTime : "hrs24"} } ); 
                    this._cachedTimeFormat = "hrs24";
                    break;
            }    
            this._populateStatusBarCtrl();
            break;  
        case "SetDaylightSavingTime":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetDaylightSavingTime", { payload : { enable : "On"} } );  
                    this._cachedDayLightSavingsTime = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetDaylightSavingTime", { payload : { enable : "Off"} } );  
                    this._cachedDayLightSavingsTime = "Off";
                    break;
            }    
            break;  
        case "SetTimeZone":
            //Update new TimeZone
            this._cachedTimeZoneIndex = params.itemIndex;
            //Send Event
            framework.sendEventToMmui(this.uiaId, "SetTimeZone", { payload : { timeZone : params.itemIndex} } );
            break; 
        case "SelectLanguageConf":
            var newLanguageIndex = params.itemIndex
            this._cachedPreviousLanguage = this._cachedLanguageSupported;
            this._cachedLanguage =  listCtrlObj.dataList.items[newLanguageIndex].text1Id;
            this._cachedLanguageSupportVR =  listCtrlObj.dataList.items[newLanguageIndex].vrSupport;
            this._cachedLanguageSupportTTS = listCtrlObj.dataList.items[newLanguageIndex].ttsSupport;
            if (this._cachedLanguage) 
            {
                framework.sendEventToMmui(this.uiaId, "SelectLanguageConf", {payload: {languageID:this._cachedLanguage}});
            } 
            break; 
        //Communication SETTINGS
        case "SetSMSNotify":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetSMSNotify", { payload : { evData : "On"} } );   
                    this._cachedSMSNotification = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetSMSNotify", { payload : { evData : "Off"} } );   
                    this._cachedSMSNotification = "Off";
                    break;
            }     
            break;
        case "SetEmailNotify":
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetEmailNotify", { payload : { emailNotify : "On"} } );   
                    this._cachedEmailNotification = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetEmailNotify", { payload : { emailNotify : "Off"} } );   
                    this._cachedEmailNotification = "Off";
                    break;
            }     
            break;  
        case "SetIncomingCallNotify":
            switch(params.additionalData)
            {
                case 1:
                     framework.sendEventToMmui(this.uiaId, "SetIncomingCallNotify" , { payload : { incomingCallNotify : "On"} } );   
                     this._cachedIncomingCallNotification = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetIncomingCallNotify" , { payload : { incomingCallNotify : "Off"} } );   
                    this._cachedIncomingCallNotification = "Off";
                    break;
            }    
            break;   
        case 'SetDownloadCallHistory':
            switch(params.additionalData)
            {
                case 1:
                     framework.sendEventToMmui(this.uiaId, "SetAutoDownloadCallHistory", { payload : { autoDownloadCallHistory : "On"} } );   
                     this._cachedDownloadCallHistory = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetAutoDownloadCallHistory", { payload : { autoDownloadCallHistory : "Off"} } );   
                    this._cachedDownloadCallHistory = "Off";
                    break;
            }    
            break;  
        case 'SetDownloadCallContacts':
            switch(params.additionalData)
            {
                case 1:
                     framework.sendEventToMmui(this.uiaId, "SetAutoDownloadContacts", { payload : { autoDownloadContacts : "On"} } );   
                     this._cachedDownloadCallContacts = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetAutoDownloadContacts", { payload : { autoDownloadContacts : "Off"} } );   
                    this._cachedDownloadCallContacts = "Off";
                    break;
            }    
            break;  
        case 'SetDownloadCallText':
            switch(params.additionalData)
            {
                case 1:
                     framework.sendEventToMmui(this.uiaId, "SetAutoDownloadText", { payload : { autoDownloadText : "On"} } );   
                     this._cachedDownloadCallText = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetAutoDownloadText", { payload : { autoDownloadText : "Off"} } );     
                    this._cachedDownloadCallText = "Off";
                    break;
            }    
            break;  
        case 'SetDownloadCallEmail':
            switch(params.additionalData)
            {
                case 1:
                     framework.sendEventToMmui(this.uiaId, "SetAutoDownloadEmail", { payload : { autoDownloadEmail : "On"} } );   
                     this._cachedDownloadCallEmail = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetAutoDownloadEmail", { payload : { autoDownloadEmail : "Off"} } );    
                    this._cachedDownloadCallEmail = "Off";
                    break;
            }    
            break;   
        case "SetRingtoneValue":
            switch (params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetRingtone", { payload : { ringtone : "Fixed"} } );     
                    this._cachedRingToneType = "Fixed";  
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetRingtone", { payload : { ringtone : "Inband"} } ); 
                    this._cachedRingToneType = "Inband";
                    break; 
                case 3:
                    framework.sendEventToMmui(this.uiaId, "SetRingtone", { payload : { ringtone : "Off"} } ); 
                    this._cachedRingToneType = "Off";
                    break; 
            }
            break;   
        case "MobileEmergencyNumber": 
            switch(params.additionalData)
            {
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetMobileEmergencyNumber", { payload : { mobileEmergencyNumberEnable : "On"} } ); 
                    this._cachedMob911 = "On";
                    break;
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetMobileEmergencyNumber", { payload : { mobileEmergencyNumberEnable : "Off"} } );
                    this._cachedMob911 = "Off";
                    break;
                default:
                    break;
            }
            break;
        case "SelectKeyboardLanguage" :
            var keyboardLanbuageIndex = params.itemIndex;
            var newKeyboardLanguage = listCtrlObj.dataList.items[keyboardLanbuageIndex].text1Id;
            var newKeyboardLanguageGUI = this.getKeyboardLangInGuiFormat(newKeyboardLanguage);
            framework.localize.setKeyboardLanguage(newKeyboardLanguageGUI);
            //Send Event
            framework.sendEventToMmui(this.uiaId, "SelectKeyboardLanguage", { payload : { languageID : newKeyboardLanguage} } );
            break;
        case "SelectContentTransfer":
            framework.sendEventToMmui("common", "Global.IntentSettingsTab"); 
            break; 
        case "SetDateFormat":
            for (var i = 0; i < listCtrlObj.dataList.itemCount; i++) {
                listCtrlObj.dataList.items[i].selected = false
                listCtrlObj.dataList.items[i].disabled = false
            }
            listCtrlObj.dataList.items[params.itemIndex].selected = true
            listCtrlObj.dataList.items[params.itemIndex].disabled = true
            listCtrlObj.updateItems(0,listCtrlObj.dataList.itemCount - 1)
             
            switch (params.itemIndex)
            {  
                case 0:
                    framework.sendEventToMmui(this.uiaId, "SetDateFormat", { payload : { formatDate : "MMDDYY"} } ); 
                    this._cachedDateFormat = "MMDDYY";
                    break;
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetDateFormat", { payload : { formatDate : "DDMMYY"} } ); 
                    this._cachedDateFormat = "DDMMYY";
                    break; 
                case 2:
                    framework.sendEventToMmui(this.uiaId, "SetDateFormat", { payload : { formatDate : "YYMMDD"} } ); 
                    this._cachedDateFormat = "YYMMDD";
                    break; 
            }  
            break;
        case "EditMessage":
            framework.sendEventToMmui(this.uiaId, "EditMessage");
            break;
        case "AdjustRingtoneVolume": 
            break; 
        case "SetBrightness": 
            break; 
        case "SelectSortOrder": 
            this._cachedContactsSortOrder = params.itemIndex; 
            switch (params.itemIndex)
            {
                case 0 :
                    framework.sendEventToMmui(this.uiaId, "SetContactsSortOrder", { payload : { contactsSortOrder : "FIRSTNameThenLastName"} } );
                    break;
                case 1:
                    framework.sendEventToMmui(this.uiaId, "SetContactsSortOrder", { payload : { contactsSortOrder : "LASTNameThenFirstName"} } );
                    break;
                default:
                    break;
            }
            break;
        case "SelectPresetMessages" :
            framework.sendEventToMmui(this.uiaId, appData);
            break;
        case "SelectPresetMessageFromList":
            this._cachedMessageText = listCtrlObj.dataList.items[params.itemIndex].text1;
            this._cachedMessageIndex = params.itemIndex;
            this._contextTable.ComposeMessage.controlProperties.KeyboardCtrl.value = this._cachedMessageText; 
            framework.sendEventToMmui(this.uiaId, appData, {payload:{"messageIndex": params.itemIndex+1}});
            break;
        default:  
            // On this callback, the appData contains the EventID for MMUI, just send it. 
            //framework.sendEventToMmui(this.uiaId, appData, params); 
            framework.sendEventToMmui(this.uiaId, appData); 
            break;
    }
}

//ScrollDetail Control
syssettingsApp.prototype._scrollSelectCallback  = function(buttonRef, appData, params)
{
    log.debug("_scrollSelectCallback called..."); 
}

// Keyboard Control
syssettingsApp.prototype._ComposeMessageOkBtnCallback = function(keyboardCtrlObj, appData, extraParams)
{
    log.debug("syssettingsApp _ComposeMessageOkBtnCallback called..."); 
    if (extraParams.input)
        this._cachedMessageText  = extraParams.input;//Append? +this._cachedMessageText;
        this._contextTable.ComposeMessage.controlProperties.KeyboardCtrl.value = this._cachedMessageText; 
        
    framework.sendEventToMmui(this.uiaId, "SaveMessage", {payload : {"messageData" : {"msgIndex": this._cachedMessageIndex + 1, "editedMessage" : this._cachedMessageText}}}); 
}

syssettingsApp.prototype._ComposeMessageCancelBtnCallback = function()
{
    log.debug("syssettingsApp _ComposeMessageCancelBtnCallback called...");
    framework.sendEventToMmui('common', "Global.Cancel");
}

/**************************
 * Context handlers
 **************************/ 

//Devices Tab
syssettingsApp.prototype._DevicesTabCtxtIn = function()
{
    log.debug("_DevicesTabCtxtIn called..."); 
    var HUDstatus = framework.getSharedData("vehsettings", "HudInstalled");
    if (HUDstatus === true || HUDstatus === false )
    {
        this._HUDInstalledStatus = HUDstatus;
    }
    this._HudInstalledStatusHandler();
}

syssettingsApp.prototype._DevicesTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DevicesTabCtxtTmpltReadyToDisplay called..."); 
    this._populateListCtrl(this._currentContextTemplate); 
}

//Display Tab
syssettingsApp.prototype._DisplayTabCtxtIn = function()
{
    log.debug("_DisplayTabCtxtIn called..."); 
    var HUDstatus = framework.getSharedData("vehsettings", "HudInstalled");
    if (HUDstatus === true || HUDstatus === false )
    {
        this._HUDInstalledStatus = HUDstatus;
    }
    this._HudInstalledStatusHandler();
}

syssettingsApp.prototype._DisplayTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DisplayTabCtxtTmpltReadyToDisplay called...");
    this._populateListCtrl(this._currentContextTemplate); 
    
}

syssettingsApp.prototype._DisplaySettingsResetCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DisplaySettingsResetCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

syssettingsApp.prototype._DisplaySettingsResetProgressCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DisplaySettingsResetProgressCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

syssettingsApp.prototype._DisplaySettingsResetErrorCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_DisplaySettingsResetErrorCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

//System Tab
syssettingsApp.prototype._SystemTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_SystemTabCtxtTmpltReadyToDisplay called...");
    //get the ignition status
    this._cachedIgnitionStatus = framework.getSharedData("vehsettings", "IgnitionStatus");
    this._cachedCANStatus = framework.getSharedData("vehsettings", "CanStatus");
    this._populateListCtrl(this._currentContextTemplate);
    if(this._isListChanged  === true)
    {
        if(params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
    this._SetFactoryResetStatus();
}

syssettingsApp.prototype._SystemTabCtxtIn = function()
{
    log.debug("_SystemTabCtxtIn called..."); 
    var HUDstatus = framework.getSharedData("vehsettings", "HudInstalled");
    if (HUDstatus === true || HUDstatus === false )
    {
        this._HUDInstalledStatus = HUDstatus;
    }
    this._HudInstalledStatusHandler();
}

syssettingsApp.prototype._FactoryResetConfirmCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_FactoryResetConfirmCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems();
    //Reset AppSDK connection
    this._connectionIn = null;
}

syssettingsApp.prototype._FactoryResetProgressCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_FactoryResetProgressCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
}

syssettingsApp.prototype._AboutCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_AboutCtxtTmpltReadyToDisplay called...");
    this._populateListCtrl(this._currentContextTemplate); 
}

syssettingsApp.prototype._AgreementsDisclaimersCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_AgreementsDisclaimersCtxtTmpltReadyToDisplay called...");
}

//Clock Tab
syssettingsApp.prototype._ClockTabCtxtIn = function()
{
    log.debug("_ClockTabCtxtIn called..."); 
    var HUDstatus = framework.getSharedData("vehsettings", "HudInstalled");
    if (HUDstatus === true || HUDstatus === false )
    {
        this._HUDInstalledStatus = HUDstatus;
    }
    this._HudInstalledStatusHandler();
}

syssettingsApp.prototype._ClockTabCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_ClockTabCtxtTmpltReadyToDisplay called..."); 
    this._populateListCtrl(this._currentContextTemplate);
}

 
syssettingsApp.prototype._SetClockCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_SetClockCtxtTmpltReadyToDisplay called. this._cachedCurrentTime = ", this._cachedCurrentTime); 
    //Set Tooltips for ump buttons
    var toolTipsEnabled = framework.getSharedData(this.uiaId, "ToolTips");
    if (toolTipsEnabled)
    {
        this._currentContextTemplate.clockSettings2Ctrl.umpCtrl.properties.buttonConfig['hoursDown'].labelId = "SetClockHrsMinus";
        this._currentContextTemplate.clockSettings2Ctrl.umpCtrl.properties.buttonConfig['hoursUp'].labelId = "SetClockHrsPlus";
        this._currentContextTemplate.clockSettings2Ctrl.umpCtrl.properties.buttonConfig['minutesDown'].labelId = "SetClockMinMinus";
        this._currentContextTemplate.clockSettings2Ctrl.umpCtrl.properties.buttonConfig['minutesUp'].labelId = "SetClockMinPlus";
    }
    var time = null;
    //Display cached time sent by MMUI
    if(this._cachedCurrentTime)
    {
        time = new Date(this._cachedCurrentTime * 1000);
    }
    else //Display System time
    {
        this._cachedCurrentTime = Math.round(new Date() / 1000.0);
        time = new Date();
    }
    this._currentContextTemplate.clockSettings2Ctrl.setCurrentTime(this._cachedCurrentTime * 1000);
    var hours = time.getHours();
    this._cachedMeridiem = (hours < 12) ? "AM" : "PM";
    this._EnableDisableControlItems();
}


syssettingsApp.prototype._SetClockCtxtTmpltDisplayed = function()
{
    log.debug("_SetClockCtxtTmpltDisplayed called..."); 

}

// SelectTimeZone Context
syssettingsApp.prototype._SelectTimeZoneCtxtTmpltReadyToDisplay = function()
{
    log.debug("_SelectTimeZoneCtxtTmpltReadyToDisplay called...");
    this._populateListCtrl(this._currentContextTemplate); 
}

// CommunicationSettings Context
syssettingsApp.prototype._CommunicationSettingsCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_CommunicationSettingsCtxtTmpltReadyToDisplay called...");
    
    //if connection is not yet established, make connection now
    if (!this._connectionIn)
    {
        //Establish an AppSDK connection
        var connectionParams = 
        {
            "context_in": 0,
            "client_type_in": 3,
            "callbacks_in": 0
           
        };
        framework.sendRequestToAppsdk(this.uiaId, this._ConnectionValueCallbackFn.bind(this), "msg", "Connect", connectionParams);
    }
    
    this._populateListCtrl(this._currentContextTemplate);
    if(this._isListChanged  === true)
    {
        if(params && params.skipRestore != undefined)
        {
            params.skipRestore = true;
        }
        this._isListChanged = false;
    }
};

syssettingsApp.prototype._CommunicationSettingsResetCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_CommunicationSettingsResetCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

syssettingsApp.prototype._CommunicationSettingsResetProgCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_CommunicationSettingsResetProgCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

syssettingsApp.prototype._CommunicationSettingsResetErrorCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_CommunicationSettingsResetErrorCtxtTmpltReadyToDisplay called...");
    this._EnableDisableControlItems(); 
};

// PresetMessages Context
syssettingsApp.prototype._PresetMessagesCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_PresetMessagesCtxtTmpltReadyToDisplay called");

    if (this._connectionIn)
    {
        var connectionParams = 
        {
            "connection_in": this._connectionIn,
            "context_in": 0,
            "type": 1
        }; 
         //deviceId is usually received from MMUI on phone connected
        log.debug("Sending AppSdk request from _PresetMessagesCtxtTmpltReadyToDisplay... value of this._connectionIn: "+this._connectionIn)
        framework.sendRequestToAppsdk(this.uiaId, this._getPresetMessagesCallbackFn.bind(this), "msg", "GetPresetMessageList", connectionParams);
    }
    else
    {
        //Establish connection here?
        log.info("Connection with AppSDK not established. Cannot proceed without connection value ");
        return;
    }
        
};
 
// ChangeLanguage Context
syssettingsApp.prototype._ChangeLanguageCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_ChangeLanguageCtxtTmpltReadyToDisplay called...");
    this._populateListCtrl(this._currentContextTemplate); 
}
 
 // ContactsSortOrder Context
syssettingsApp.prototype._ContactsSortOrderCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_ContactsSortOrderCtxtTmpltReadyToDisplay called...");
    this._populateListCtrl(this._currentContextTemplate); 
}
  
// LanguageConf Context
syssettingsApp.prototype._LanguageConfCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("syssettingsApp _LanguageConfCtxtTmpltReadyToDisplay called...");
    
    if (this._currentContext.params &&
        this._currentContext.params.payload &&
        this._currentContext.params.payload.languageID )
    {
        this._cachedLanguage = this._currentContext.params.payload.languageID;
    }
    
    if(this._cachedLanguageSupportVR || this._cachedLanguageSupportTTS)
    {
        var text1Id ="LanguageConfText";
        var subMap = {"languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguage)};
        
    }
    else
    {
        if(this._cachedLanguage === "LANGS_BR_PORTUGUESE")
        {
            var text1Id ="LanguageConfTextNoVRNoUKEnglish";
            var subMap = {"languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguage),"VRlanguageID": framework.localize.getLocStr(this.uiaId, "LANGS_PT_PORTUGUESE")};
        }
        else if (this._cachedLanguage === "LANGS_TW_MANDARIN" || this._cachedLanguage === "LANGS_HK_CANTONESE")
        {
            var text1Id ="LanguageConfTextNoVRNoUKEnglish";
            var subMap = {"languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguage),"VRlanguageID": framework.localize.getLocStr(this.uiaId, "LANGS_TW_CHINESE_TAIWAN")};
        }
        else 
        {
            var text1Id ="LanguageConfTextNoVR";
            var subMap = {"languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguage)};
        }
    }
    
    this._currentContextTemplate.dialog3Ctrl.setText1Id(text1Id,subMap);
    this._EnableDisableControlItems(); 
}

//UseUKEnglish Context
syssettingsApp.prototype._UseUKEnglishCtxtIn = function(msg)
{
    log.debug("syssettingsApp _UseUKEnglishCtxtIn called...");
    if(msg && msg.params.payload && msg.params.payload.languageID)
    {
        this._cached_UKEng_Taiw_Braz_Cant_Lang = msg.params.payload.languageID;//LANGS_UK_ENGLISH is the default value
    }
}

syssettingsApp.prototype._UseUKEnglishCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("syssettingsApp _UseUKEnglishCtxtTmpltReadyToDisplay called...");
    var text1Id = "UseUKEng_Taiw_Braz_Cant_Text";
    
    if(this._cachedLanguage === "LANGS_TW_MANDARIN")
    {
        this._cached_UKEng_Taiw_Braz_Cant_Lang = "LANGS_TW_CHINESE_TAIWAN";
    }
    
    
    var subMap = 
        {
            "languageID": framework.localize.getLocStr(this.uiaId, this._cachedLanguage),
            "languageVRTTSID" : framework.localize.getLocStr(this.uiaId, this._cached_UKEng_Taiw_Braz_Cant_Lang)
        };
    this._currentContextTemplate.dialog3Ctrl.setText1Id(text1Id,subMap);
    this._EnableDisableControlItems(); 
}

//LanguageChangeProgress
syssettingsApp.prototype._LanguageChangeProgressCtxtTmpltNoLongerDisplayed = function(params)
{
    log.debug("syssettingsApp _LanguageChangeProgressCtxtTmpltNoLongerDisplayed called...");
    //Language was successfully changed since we enter 'ChangeLanguage' after 'LanguageChangeProgress' 
    if(this._currentContext && this._currentContext.ctxtId === "ChangeLanguage" && this._previousContext && this._previousContext.ctxtId === "LanguageChangeProgress")
    {
        //Ask MMUI to send the language changed alert.
        framework.sendEventToMmui(this.uiaId, "ShowNewLanguage");
    }
}

syssettingsApp.prototype._LanguageChangeErrorCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_LanguageChangeErrorCtxtTmpltReadyToDisplay called...");
    if(this._cachedPreviousLanguage)
    {
        this._cachedLanguageSupported = this._cachedPreviousLanguage;
    }
    this._EnableDisableControlItems(); 
}

// ComposeMessage Context
syssettingsApp.prototype._ComposeMessageCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_ComposeMessageCtxtTmpltReadyToDisplay called...");
    
    if (this._currentContext.params &&
        this._currentContext.params.payload &&
        this._currentContext.params.payload.indexMessage )
    {
        var indexMessage = this._currentContext.params.payload.indexMessage;
    }
    this._EnableDisableControlItems();
}

//KeyboardLanguage
syssettingsApp.prototype._KeyboardLanguageCtxtTmpltReadyToDisplay = function(params)
{
    log.debug("_KeyboardLanguageCtxtTmpltReadyToDisplay called");
    this._populateListCtrl(this._currentContextTemplate); 
}



/**************************
 * Message handlers
 **************************/

// DisplayReset
syssettingsApp.prototype._DisplayResetMsgHandler = function(msg)
{
    log.debug("DisplayReset received", msg); 
    
    if (this._currentContext && this._currentContextTemplate)  
    {
        switch (msg.msgId)            
        {
            case "DisplaySetResetSuccess":     
                framework.sendEventToMmui(this.uiaId, "DisplaySetResetSuccess");   
                break;
            case "DisplaySetResetFailure":     
                framework.sendEventToMmui(this.uiaId, "DisplaySetResetFailure"); 
                break;
            default:
                log.debug("Do nothing");
                break;
        }
    }
}

syssettingsApp.prototype._SelectLanguageMsgHandler = function(msg)
{
    log.debug("SelectLanguage received", msg); 
    
    // if (this._currentContext && this._currentContextTemplate)  
    // {
        // switch (msg.msgId)            
        // {
            // case "SelectLanguageSuccess":     
                // framework.sendEventToMmui(this.uiaId, "LanguageChangeSuccess", msg.params); 
                // break;
            // case "SelectLanguageError":     
                // framework.sendEventToMmui(this.uiaId, "LanguageChangeError", msg.params); 
                // break;
            // default:
                // log.debug("Do nothing");
                // break;
        // }
    // }
}


// Display
syssettingsApp.prototype._DisplayMsgHandler = function(msg)
{
    log.debug("Display received with setting: ", msg.params.payload.displaySetting); 
}

// DayNightMode
syssettingsApp.prototype._DayNightModeMsgHandler = function(msg)
{
    log.debug("DayNightMode received", msg); 
    this._cachedDayNightMode = msg.params.payload.dayNightSetting;
    
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DisplayTab")
    { 
        if (this._cachedDayNightMode)
        {
            switch (this._cachedDayNightMode)
            {
                case "Auto":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(2, 1);
                    break;
                case "Day":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(2, 2);
                    break;
                case "Night":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(2, 3);
                    break;
                default:
                    log.debug("Unknown Mode Setting.");
                    break;
             } 
        }
    }
}

//Disable Brightness setting if LVDS is Over Temperature
syssettingsApp.prototype._DisplayOverTemperatureMsgHandler = function(msg)
{
    log.debug("DisplayOverTemperature received", msg);
    if(msg && msg.params && msg.params.payload && (msg.params.payload.displayOverTemperature != null))
    {
        this._cachedDisplayOverTemperature = msg.params.payload.displayOverTemperature;
        if(this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DisplayTab")
        {
            this._EnableDisableControlItems();
        }
    }
}

// Brightness
syssettingsApp.prototype._BrightnessMsgHandler = function(msg)
{
    this._cachedBrightness = msg.params.payload.brightnessSetting;
    log.debug("Brightness received with value : ", this._cachedBrightness);
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DisplayTab")
    { 
        if (this._cachedBrightness != null && this._cachedBrightness != undefined)
        {
            this._currentContextTemplate.list2Ctrl.setSliderValue(3,this._cachedBrightness);
        }
    }
}

// Contrast
syssettingsApp.prototype._ContrastMsgHandler = function(msg)
{
    this._cachedContrast = msg.params.payload.ContrastSetting;
    log.debug("Contrast received with value : ", this._cachedContrast);
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DisplayTab")
    {
        if (this._cachedContrast != null && this._cachedContrast != undefined)
        {
            this._currentContextTemplate.list2Ctrl.setSliderValue(4,this._cachedContrast);
        }
    }
}

//ToolTips
syssettingsApp.prototype._ToolTipsMsgHandler = function(msg)
{
    log.debug("ToolTips received", msg);
    if(msg && msg.params && msg.params.payload && msg.params.payload.toolTips != null && msg.params.payload.toolTips != undefined)
    {
        var toolTipsSetting = msg.params.payload.toolTips;
        switch(toolTipsSetting)
        {
            case 'On':
                framework.setSharedData(this.uiaId, "ToolTips", true);
                if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
                {
                    var toolTipsIndex = this._SystemTabHelperArray["toolTips"].index
                    this._currentContextTemplate.list2Ctrl.setToggleValue(toolTipsIndex,1);
                }
                break;
            case 'Off':
                framework.setSharedData(this.uiaId, "ToolTips", false);
                if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
                {
                    var toolTipsIndex = this._SystemTabHelperArray["toolTips"].index
                    this._currentContextTemplate.list2Ctrl.setToggleValue(toolTipsIndex,2);
                }
                break;
            default:
                log.debug("Unknown ToolTips Setting.");
                break;  
        }
    }
}

// LanguageSupported
syssettingsApp.prototype._LanguageSupportedMsgHandler = function(msg)
{
    log.debug("LanguageSupported received", msg); 
    
    this._cachedLanguageSupported = msg.params.payload.languageName.languageID;
    this._cachedLanguageSupportVR = msg.params.payload.languageName.vrSupport;
    this._cachedLanguageSupportTTS = msg.params.payload.languageName.ttsSupport;

    this._cachedPreviousLanguage = this._cachedLanguageSupported;
    
    var langCode = framework.localize.getLangInGuiFormat(this._cachedLanguageSupported);    
    if (langCode)
    {
        framework.localize.setLanguage(langCode, this._cachedLanguageSupportVR, false, this._langChangeCompleteCallback.bind(this));  
    } 
    
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ChangeLanguage")
    { 
        //setRadio() not required here as language is not quickly selectable?
        this._populateListCtrl(this._currentContextTemplate);
    }
}

// LanguagesList
syssettingsApp.prototype._LanguagesListMsgHandler = function(msg)
{
    log.debug("LanguagesList received", msg); 
    this._cachedLanguagesList = msg.params.payload.languageList;
    
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ChangeLanguage")
    {
        this._populateListCtrl(this._currentContextTemplate);
    }
}

// LanguageChanged
syssettingsApp.prototype._LanguageChangedMsgHandler = function(msg)
{
    log.debug("LanguageChanged msg received", msg);    
    this._isLangChangeSuccess = false;
    if (this._cachedLanguage === msg.params.payload.newLanguage)
    {          
        var langCode = framework.localize.getLangInGuiFormat(this._cachedLanguage);        
        if(!(framework.localize._currentLang === langCode))
        {
            framework.localize.setLanguage(langCode, this._cachedLanguageSupportVR, false, this._langChangeCompleteCallback.bind(this));  
        } 
        else
        {
            // since same language change has been requested, sending success reponse to MMUI
            log.warn("Language is already set to " + langCode + ", hence not changing GUI Language : reporting succes to MMUI");
            framework.sendEventToMmui(this.uiaId, "GUILanguageChangeStatus", { payload : { changeStatus : "Success"} });
            this._cachedLanguageSupported = this._cachedLanguage;
        }
    } 
    else
    {
        log.warn ("MMUI Message returned a different language in response, hence not changing GUI Language");
    }
}

syssettingsApp.prototype._langChangeCompleteCallback = function(status)
{
    log.debug("_langChangeCompleteCallback called with status :", status);
    //If we are changing language and not setting the default languageSupported
    this._isLangChangeSuccess = status;
    if (status)
    {        
        framework.sendEventToMmui(this.uiaId, "GUILanguageChangeStatus", { payload : { changeStatus : "Success"} });

        if(this._cachedLanguage)
        {
            this._cachedLanguageSupported = this._cachedLanguage;
        }
    }
    else
    {
        framework.sendEventToMmui(this.uiaId, "GUILanguageChangeStatus", { payload : { changeStatus : "Failure"} });
    }
} 

// Temperature Installed
syssettingsApp.prototype._TemperatureUnit_InstalledMsgHandler = function(msg)
{
    log.debug("TemperatureUnit_Installed received", msg); 
    if(msg && msg.params && msg.params.payload && (msg.params.payload.evData != null))
    {
        this._SystemTabHelperArray["temperature"].display = msg.params.payload.evData;
        framework.localize.setTemperatureUnit(this._cachedTemperature); 
        
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
}

// Temperature
syssettingsApp.prototype._TemperatureMsgHandler = function(msg)
{
    log.debug("Temperature received", msg);
    if(msg && msg.params && msg.params.payload && msg.params.payload.temperatureUnits)
    {
        var temperatureIndex = this._SystemTabHelperArray["temperature"].index;
        this._cachedTemperature = msg.params.payload.temperatureUnits;
        framework.localize.setTemperatureUnit(this._cachedTemperature); 
        
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
        {
            if (this._cachedTemperature && this._SystemTabHelperArray["temperature"].display === 1)
            {
                switch (this._cachedTemperature)
                {
                    case "Fahrenheit":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(temperatureIndex, 1);
                        break;
                    case "Celsius":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(temperatureIndex, 2);
                        break;
                    default:
                        log.debug("Unknown Temperature unit received.");
                        break;
                }   
            }
        }
    }
}

// Distance Installed 
syssettingsApp.prototype._DistanceUnit_InstalledMsgHandler = function(msg)
{
    log.debug("DistanceUnit_Installed received", msg);
    if(msg && msg.params && msg.params.payload && (msg.params.payload.evData != null))
    {
        this._SystemTabHelperArray["distance"].display = msg.params.payload.evData;
        framework.localize.setDistanceUnit(this._cachedDistance); 
        
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
}

// Distance
syssettingsApp.prototype._DistanceMsgHandler = function(msg)
{
    log.debug("Distance received", msg);
    if(msg && msg.params && msg.params.payload && msg.params.payload.distanceUnits)
    {
        var distanceIndex = this._SystemTabHelperArray["distance"].index;
        this._cachedDistance = msg.params.payload.distanceUnits;
        framework.localize.setDistanceUnit(this._cachedDistance); 
        
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
        {
            if (this._cachedDistance && this._SystemTabHelperArray["distance"].display === 1)
            {
                switch (this._cachedDistance)
                {
                    case "Miles":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(distanceIndex, 1);
                        break;
                    case "Kilometers":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(distanceIndex, 2);
                        break;
                    default:
                        log.debug("Unknown Distance unit received.");
                        break;
                 } 
            }
        }
    }
}

// TimeFormat
syssettingsApp.prototype._TimeFormatMsgHandler = function(msg)
{
    log.debug("TimeFormat received", msg);

    this._cachedTimeFormat = msg.params.payload.timeFormat;
    if (this._cachedTimeFormat === "hrs12" || this._cachedTimeFormat === "12hrs")
    {
        this._cachedTimeFormat = "hrs12";
        framework.localize.setTimeFormat("12hrs");
    }
    else if(this._cachedTimeFormat === "hrs24" || this._cachedTimeFormat === "24hrs")
    {
        this._cachedTimeFormat = "hrs24";
        framework.localize.setTimeFormat("24hrs");
    }    
    this._populateStatusBarCtrl();
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ClockTab")
    {
        if (this._cachedTimeFormat)
        {
            switch (this._cachedTimeFormat)
            {
                case "hrs12":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(2, 1);
                    break;
                case "hrs24":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(2, 2);
                    break;
                default :
                    log.debug("Unknown Clock Settings Format");
                    break;
             }  
        }
    }
}

// Region
syssettingsApp.prototype._RegionMsgHandler = function(msg)
{
    log.debug("Region msg received", msg); 
    framework.localize.setRegion(msg.params.payload.RegionValue);        

}
// end of v2.4 msg handlers

//Destination
syssettingsApp.prototype._DestinationMsgHandler = function(msg)
{
    log.debug("Destination msg received", msg);
    if(msg && msg.params && msg.params.payload && msg.params.payload.destination)
    {
        var destinationCode = msg.params.payload.destination;
        framework.setSharedData(this.uiaId, "DestinationCode", destinationCode);
    }
}

// DateFormat IMPLEMENT _cachedDateFormat
syssettingsApp.prototype._DateFormatMsgHandler = function(msg)
{
    log.debug("DateFormat received", msg); 
    this._cachedDateFormat = msg.params.payload.dateFormat;
    if (this._currentContext && this._currentContextTemplate)
    {
        this._populateListCtrl(this._currentContextTemplate);
    }
}

// GPSSync
syssettingsApp.prototype._GPSSyncMsgHandler = function(msg)
{
    log.debug("GPSSync received with msg.params.payload.enableGpsSync: ", msg.params.payload.enableGpsSync); 
    if (msg && msg.params && msg.params.payload) 
    {
        this._cachedGPSSync = msg.params.payload.enableGpsSync;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ClockTab")
        {
            switch (this._cachedGPSSync)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(1,1);
                    gpsSyncStatus = true;
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(1,2);
                    gpsSyncStatus = false;
                    break; 
                default:
                    log.debug("Unknown GPSSync Setting");
                    break;
             }
            this._EnableDisableClockTabItemsOnGpsSyncStatus(gpsSyncStatus);
        }
    }
    
}

// TimeZone
syssettingsApp.prototype._TimeZoneMsgHandler = function(msg)
{
    log.debug("TimeZone received", msg); 
    this._cachedTimeZoneIndex = msg.params.payload.timeZone;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SelectTimeZone")
    {
        if (this._cachedTimeZoneIndex != undefined && this._cachedTimeZoneIndex != null)
        { 
            this._currentContextTemplate.list2Ctrl.setRadio(this._cachedTimeZoneIndex, true);
        }
    }
}

// TimeZoneList IMPLEMENT _cachedTimeZoneList. This is not implemented currently
syssettingsApp.prototype._TimeZoneListMsgHandler = function(msg)
{
    log.debug("TimeZoneList received", msg); 
    this._cachedTimeZoneList = msg.params.payload.listOfTimeZones;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SelectTimeZone")
    { 
        this._populateListCtrl(this._currentContextTemplate);
    }
}

//Navi Status message handler
syssettingsApp.prototype._NaviStatusMsgHandler = function(msg)
{
    if(msg && msg.params && msg.params.payload && msg.params.payload.NaviStatus)
    {
        log.debug("NaviStatus received with value : ", this._cachedNaviStatus);
        this._cachedNaviStatus = msg.params.payload.NaviStatus;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ClockTab")
        {
            var gpsSyncStatus = this._cachedGPSSync === "On" ? true : false;
            this._EnableDisableClockTabItemsOnGpsSyncStatus(gpsSyncStatus);
        }
    }
}

//DayLightSavingsTime
syssettingsApp.prototype._DayLightSavingsTimeMsgHandler = function(msg)
{
    log.debug("DayLightSavingsTime received", msg);
    if (msg && msg.params && msg.params.payload && msg.params.payload.dst)
    {
        this._cachedDayLightSavingsTime = msg.params.payload.dst;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ClockTab")
        {
            if (this._cachedDayLightSavingsTime)
            {
                switch (this._cachedDayLightSavingsTime)
                {
                    case "On":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(4,1);
                        break;
                    case "Off":
                        this._currentContextTemplate.list2Ctrl.setToggleValue(4,2);
                        break; 
                    default:
                        log.debug("Unknown DST Setting");
                        break;
                 }
            }
        }
        
    }
}

// SendCurrentTimeEpoch
syssettingsApp.prototype._SendCurrentTimeEpochMsgHandler = function(msg)
{
    log.debug("SendCurrentTimeEpoch received", msg);
    // Update the control to change the current time
    if (msg && msg.params && msg.params.payload && msg.params.payload.u32TimestampSec)
    {
        this._cachedCurrentTime = msg.params.payload.u32TimestampSec;
        //Set clock and this._lastTimeChangedAt on initialization
        if(!this._lastTimeChangedAt)
        {
            var time = new Date(this._cachedCurrentTime * 1000);
            var hours = time.getHours();
            var min = time.getMinutes();
            log.warn('Update clock time: ' + hours + " : " + min);
            this._lastTimeChangedAt = new Date();
            this._populateStatusBarCtrl();
            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SetClock" )
            {
                this._currentContextTemplate.clockSettings2Ctrl.setCurrentTime(this._cachedCurrentTime * 1000);
            }
        }
        //Settle Time Implementation
        else
        {
            var timeDifferenceSinceLastUserChange = new Date() - this._lastTimeChangedAt;
            //log.debug('timeDifferenceSinceLastUserChange - ' + timeDifferenceSinceLastUserChange);
            if(timeDifferenceSinceLastUserChange < this._contextTable.SetClock.controlProperties.ClockSettings2Ctrl.clockSettleTime)
            {
                clearTimeout(this._scheduledClockUpdate);
                this._scheduledClockUpdate = setTimeout(this._updateTimeEpoch.bind(this), this._contextTable.SetClock.controlProperties.ClockSettings2Ctrl.clockSettleTime);
            }
            else
            {
                this._updateTimeEpoch();
            }
        }
    }
}

syssettingsApp.prototype._updateTimeEpoch = function()
{
    var time = new Date(this._cachedCurrentTime * 1000);
    var hours = time.getHours();
    var min = time.getMinutes();
    this._populateStatusBarCtrl();
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SetClock" )
    {
        log.warn('_updateTimeEpoch - Update clock time: ' + hours + " : " + min);
        this._currentContextTemplate.clockSettings2Ctrl.setCurrentTime(this._cachedCurrentTime * 1000);
    }
}

//Meridiem Time
syssettingsApp.prototype._MeridiamTimeMsgHandler = function(msg)
{
    log.debug("MeridiamTime received", msg); 
    this._cachedMeridiem = msg.params.payload.meridiem;
}

// SMSNotification
syssettingsApp.prototype._SMSNotificationMsgHandler = function(msg)
{
    log.debug("SMSNotification received", msg); 
    this._cachedSMSNotification = msg.params.payload.evData;
    var smsNotifyIndex = this._CommunicationSettingsHelperArray["smsNotify"].index;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedSMSNotification && smsNotifyIndex && this._currentContextTemplate.list2Ctrl.dataList.items[smsNotifyIndex].itemStyle === 'styleOnOff')
        {
            switch (this._cachedSMSNotification)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(smsNotifyIndex,1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(smsNotifyIndex,2);
                    break; 
                default :
                    log.debug("Unknown SMS Notification");
                    break;
             }
        }
    }
}

// EmailNotification
syssettingsApp.prototype._EmailNotificationMsgHandler = function(msg)
{
    log.debug("EmailNotification received", msg); 
    this._cachedEmailNotification = msg.params.payload.emailNotify;
    var emailNotifyIndex = this._CommunicationSettingsHelperArray["emailNotify"].index;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedEmailNotification && emailNotifyIndex && this._currentContextTemplate.list2Ctrl.dataList.items[emailNotifyIndex].itemStyle === 'styleOnOff')
        {
            switch (this._cachedEmailNotification)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(emailNotifyIndex,1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(emailNotifyIndex,2);
                    break; 
                default :
                    log.debug("Unknown Email Notification");
                    break;
             }
        }
    }
}

// IncomingCallNotification
syssettingsApp.prototype._IncomingCallNotificationMsgHandler = function(msg)
{
    log.debug("IncomingCallNotification received", msg); 
    this._cachedIncomingCallNotification = msg.params.payload.incomingCallNotify;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedIncomingCallNotification)
        {
            switch (this._cachedIncomingCallNotification)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["incomingCallNotify"].index,1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["incomingCallNotify"].index,2);
                    break;
                default :
                    log.debug("Unknown Incoming Call Notification");
                    break;
            }
        }
    }
}

// AutoDownloadCall
syssettingsApp.prototype._AutoDownloadCallHistoryMsgHandler = function(msg)
{
    log.debug("_AutoDownloadCallHistoryMsgHandler received", msg); 
    this._cachedDownloadCallHistory = msg.params.payload.autoDownloadCallHistory;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedDownloadCallHistory)
        {
            switch (this._cachedDownloadCallHistory)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallHistory"].index,1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallHistory"].index,2);
                    break;
                default :
                    log.debug("Unknown Download Call History setting");
                    break;
            }
        }
    }
}
// AutoDownloadContacts
syssettingsApp.prototype._AutoDownloadContactsMsgHandler = function(msg)
{
    log.debug("_AutoDownloadContactsMsgHandler received", msg); 
    this._cachedDownloadCallContacts = msg.params.payload.autoDownloadContacts;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedDownloadCallContacts)
        {
            switch (this._cachedDownloadCallContacts)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallContacts"].index,1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallContacts"].index,2);
                    break;
                default :
                    log.debug("Unknown Downloaded Call Contacts settings");
                    break;
            }
        }
    }
}

// AutoDownloadText
syssettingsApp.prototype._AutoDownloadTextMsgHandler = function(msg)
{
    log.debug("_AutoDownloadTextMsgHandler received", msg); 
    this._cachedDownloadCallText = msg.params.payload.SetAutoDownloadText;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedDownloadCallText)
        {
            var smsNotifyIndex = this._CommunicationSettingsHelperArray["smsNotify"].index;
            switch (this._cachedDownloadCallText)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallText"].index,1);
                    //Modify SMS Notification accordingly
                    if(smsNotifyIndex)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[smsNotifyIndex].itemStyle = "styleOnOff";
                        this._currentContextTemplate.list2Ctrl.dataList.items[smsNotifyIndex].disabled = this._disableSpeedRestricted || false;
                        this._currentContextTemplate.list2Ctrl.updateItems(smsNotifyIndex,smsNotifyIndex);
                        switch(this._cachedSMSNotification)
                        {
                            case "On":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(smsNotifyIndex,1);
                                break;
                            case "Off":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(smsNotifyIndex,2);
                                break; 
                            default :
                                log.debug("Unknown SMS Notification");
                                break;
                        }
                    }
                    break;
                case "Off":
                    //this._currentContextTemplate.list2Ctrl.setToggleValue(6,2);
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallText"].index,2);
                    //Modify SMS Notification accordingly
                    if(smsNotifyIndex)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[smsNotifyIndex].itemStyle = "style01";
                        this._currentContextTemplate.list2Ctrl.dataList.items[smsNotifyIndex].disabled = true;
                        this._currentContextTemplate.list2Ctrl.updateItems(smsNotifyIndex,smsNotifyIndex);
                    }
                    break;
                default:
                    log.debug("Unknown Downloaded Call Text settings");
                    break;
            }
        }
    }
}

// AutoDownloadEmail
syssettingsApp.prototype._AutoDownloadEmailMsgHandler = function(msg)
{
    log.debug("_AutoDownloadEmailMsgHandler received", msg); 
    this._cachedDownloadCallEmail = msg.params.payload.autoDownloadEmail;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedDownloadCallEmail)
        {
            var emailNotifyIndex = this._CommunicationSettingsHelperArray["emailNotify"].index;
            switch (this._cachedDownloadCallEmail)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallEmail"].index,1);
                    //Modify Email Notification accordingly
                    if(emailNotifyIndex)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[emailNotifyIndex].itemStyle = "styleOnOff";
                        this._currentContextTemplate.list2Ctrl.dataList.items[emailNotifyIndex].disabled = this._disableSpeedRestricted || false;
                        this._currentContextTemplate.list2Ctrl.updateItems(emailNotifyIndex,emailNotifyIndex);
                        switch(this._cachedEmailNotification)
                        {
                            case "On":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(emailNotifyIndex,1);
                                break;
                            case "Off":
                                this._currentContextTemplate.list2Ctrl.setToggleValue(emailNotifyIndex,2);
                                break; 
                            default :
                                log.debug("Unknown Email Notification");
                                break;
                        }
                    }
                    break;
                case "Off":
                    //this._currentContextTemplate.list2Ctrl.setToggleValue(7,2);
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["downloadCallEmail"].index,2);
                    //Modify Email Notification accordingly
                    if(emailNotifyIndex)
                    {
                        this._currentContextTemplate.list2Ctrl.dataList.items[emailNotifyIndex].itemStyle = "style01";
                        this._currentContextTemplate.list2Ctrl.dataList.items[emailNotifyIndex].disabled = true;
                        this._currentContextTemplate.list2Ctrl.updateItems(emailNotifyIndex,emailNotifyIndex);
                    }
                    break;
                default:
                    log.debug("Unknown Downloaded Call Email settings");
                    break;
            }
        }
    }
}

// RingToneType
syssettingsApp.prototype._RingToneTypeMsgHandler = function(msg)
{
    log.debug("RingToneType received", msg); 
    this._cachedRingToneType = msg.params.payload.ringtone;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedRingToneType)
        {
            switch (this._cachedRingToneType)
            {
                case "Fixed":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["ringtone"].index, 1);
                    break;
                case "Inband":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["ringtone"].index, 2);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(this._CommunicationSettingsHelperArray["ringtone"].index, 3);
                    break;
                default:
                    log.debug("Unknown Ringtone type.");
                    break;
            }
        }
    }
}

// HandsfreeVolumeSetting
syssettingsApp.prototype._HandsfreeVolumeSettingMsgHandler = function(msg)
{
    this._cachedHandsfreeVolume = msg.params.payload.volumeHandsfreePhone;
    log.debug("HandsfreeVolumeSetting received with value : ", this._cachedHandsfreeVolume);
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedHandsfreeVolume != null && this._cachedHandsfreeVolume != undefined)
        {
            this._currentContextTemplate.list2Ctrl.setSliderValue(this._CommunicationSettingsHelperArray["phoneVolume"].index,this._cachedHandsfreeVolume);
        }
    }
}

// RingtoneAndVRVolumeSetting
syssettingsApp.prototype._RingtoneAndVRVolumeSettingMsgHandler = function(msg)
{
    this._cachedRingtoneAndVRVolume = msg.params.payload.volumeRingtoneAndVR;
    log.debug("RingtoneAndVRVolumeSetting received with value : ", this._cachedRingtoneAndVRVolume);
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        if (this._cachedRingtoneAndVRVolume !=null && this._cachedRingtoneAndVRVolume !=undefined)
        {
            this._currentContextTemplate.list2Ctrl.setSliderValue(this._CommunicationSettingsHelperArray["vrVolume"].index,this._cachedRingtoneAndVRVolume);
        }
    }
}

//PhoneVolumeControl
syssettingsApp.prototype._PhoneVolumeControlMsgHandler = function(msg)
{
    log.debug("PhoneVolumeControl received", msg); 
    if(msg.params.payload.phoneVolumeControl !== this._cachedPhoneVolumeControl)
    {
        this._cachedPhoneVolumeControl = msg.params.payload.phoneVolumeControl;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
        {
            if (this._cachedPhoneVolumeControl)
            {
                switch (this._cachedPhoneVolumeControl)
                {
                    case "Enabled":
                        this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["phoneVolume"].index].disabled = false;
                        break;
                    case "Disabled":
                        this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["phoneVolume"].index].disabled = true;
                        break;
                    default:
                        log.debug("Unknown Volume Control setting");
                        break;
                }
                this._currentContextTemplate.list2Ctrl.updateItems(this._CommunicationSettingsHelperArray["phoneVolume"].index,this._CommunicationSettingsHelperArray["phoneVolume"].index);
            }
        }
    }
}

//VR_RingtoneVolumeControl
syssettingsApp.prototype.VR_RingtoneVolumeControlMsgHandler = function(msg)
{
    log.debug("VR_RingtoneVolumeControl received", msg); 
    if(msg.params.payload.VR_RingtoneVolumeControl !== this._cachedVR_RingtoneVolumeControl)
    {
        this._cachedVR_RingtoneVolumeControl = msg.params.payload.VR_RingtoneVolumeControl;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
        {
            if (this._cachedVR_RingtoneVolumeControl)
            {
                switch (this._cachedVR_RingtoneVolumeControl)
                {
                    case "Enabled":
                        this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["vrVolume"].index].disabled = false;
                        break;
                    case "Disabled":
                        this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["vrVolume"].index].disabled = true;
                        break;
                    default:
                        log.debug("Unknown Volume Control setting");
                        break;
                }
                this._currentContextTemplate.list2Ctrl.updateItems(this._CommunicationSettingsHelperArray["vrVolume"].index,this._CommunicationSettingsHelperArray["vrVolume"].index); 
            }
        }
    }
}

//SaveMessageStatus (Edited Preset Message is saved by AppSDK)
syssettingsApp.prototype._SaveMessageStatusMsgHandler = function(msg)
{
    var savePresetMessageStatus = msg.params.payload.Status;
    log.debug("SaveMessageStatus received with status: ", savePresetMessageStatus); 
}

// PresetMessagesList
syssettingsApp.prototype._PresetMessagesListMsgHandler = function(msg)
{
    log.debug("PresetMessagesList received", msg); 
    this._cachedPresetMessagesList = msg.params.payload.listOfPresetMessages;
    if (this._currentContext && this._currentContextTemplate && this._currentContextTemplate)
    {
        
        this._populateListCtrl(this._currentContextTemplate);
    }
}

//MobilePhone911SettingAvailableUnavailable
syssettingsApp.prototype._MobilePhone911SettingAvailableUnavailableMsgHandler = function(msg)
{
    log.debug("MobilePhone911SettingAvailableUnavailable received", msg);
    if (msg && msg.params && msg.params.payload && (msg.params.payload.mobilePhone911Setting != null))
    {
        this._CommunicationSettingsHelperArray['mobileEmergency'].display = msg.params.payload.mobilePhone911Setting;
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
}
// MobileEmergencyNumber
syssettingsApp.prototype._MobileEmergencyNumberMsgHandler = function(msg)
{
    log.debug("MobileEmergencyNumber received", msg); 
    this._cachedMob911 = msg.params.payload.mobileEmergencyNumberEnable;
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
    {
        var mobileEmergencyIndex = this._CommunicationSettingsHelperArray["mobileEmergency"].index;
        if (this._cachedMob911 != undefined && mobileEmergencyIndex)
        {
            switch (this._cachedMob911)
            {
                case "On":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(mobileEmergencyIndex, 1);
                    break;
                case "Off":
                    this._currentContextTemplate.list2Ctrl.setToggleValue(mobileEmergencyIndex, 2);
                    break;
                default:
                    log.debug("Unknown Emergency Contact setting.");
                    break;
            }
        }
    }
}

// ContactsSortOrder msg
syssettingsApp.prototype._ContactsSortOrderMsgHandler = function(msg)
{
    log.debug("ContactsSortOrder received", msg); 
    
    if(msg && msg.params && msg.params.payload && msg.params.payload.contactsSortOrder === "FIRSTNameThenLastName")
    {
        this._cachedContactsSortOrder = 0;
    }
    else if(msg && msg.params && msg.params.payload && msg.params.payload.contactsSortOrder === "LASTNameThenFirstName")
    {
        this._cachedContactsSortOrder = 1;
    }
    
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "ContactsSortOrder")
    {
        if (this._cachedContactsSortOrder != undefined)
        {
            this._currentContextTemplate.list2Ctrl.setRadio(this._cachedContactsSortOrder, true);
        } 
    }
}


syssettingsApp.prototype._KeyboardLanguageMsgHandler = function(msg)
{
    log.debug("KeyboardLanguage msg received", msg);
    if(msg && msg.params && msg.params.payload && msg.params.payload.keyboardLanguage)
    {
        this._cachedKeyboardLanguage = msg.params.payload.keyboardLanguage;
        var newKeyboardLanguage = this.getKeyboardLangInGuiFormat(this._cachedKeyboardLanguage)
        if(newKeyboardLanguage)
        {
            framework.localize.setKeyboardLanguage(newKeyboardLanguage);
            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "KeyboardLanguage")
            {
                //setRadio() not required here as keyboardLanguage is not quickly selectable
                this._populateListCtrl(this._currentContextTemplate);
            }
        }
    }
}

syssettingsApp.prototype._KeyboardLanguagesListMsgHandler = function(msg)
{
    log.debug("_KeyboardLanguagesListMsgHandler received", msg); 
    if(msg && msg.params && msg.params.payload && msg.params.payload.keyboardLanguageList)
    {
        this._cachedKeyboardLanguagesList = msg.params.payload.keyboardLanguageList.split(";");
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "KeyboardLanguage")
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
}

syssettingsApp.prototype._recentKeyboardLanguagesListMsgHandler = function(msg)
{
    log.debug("_recentKeyboardLanguagesListMsgHandler received", msg); 
    if(msg && msg.params && msg.params.payload && msg.params.payload.keyboardLanguageList)
    {
        this._cachedRecentKeyboardLanguagesList = msg.params.payload.keyboardLanguageList.split(";");
        if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "KeyboardLanguage")
        {
            this._populateListCtrl(this._currentContextTemplate);
        }
    }
}

syssettingsApp.prototype._MaxRecentKeyboardNumberMsgHandler = function(msg)
{
    log.debug("_MaxRecentKeyboardNumberMsgHandler received", msg); 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        this._cachedMaxNumberofRecentLanguages = msg.params.payload.evData;
        if(this._cachedRecentLanguagesNumber > this._cachedMaxNumberofRecentLanguages)
        {
            this._cachedRecentLanguagesNumber = this._cachedMaxNumberofRecentLanguages;
        }
    }
}

syssettingsApp.prototype._RecentKeyboardNumberMsgHandler = function(msg)
{
    log.debug("_RecentKeyboardNumberMsgHandler received", msg); 
    if(msg && msg.params && msg.params.payload && msg.params.payload.evData)
    {
        this._cachedRecentLanguagesNumber = msg.params.payload.evData;
    }
}

syssettingsApp.prototype._SendDisplaySettingsResetProgressMsgHandler = function(msg)
{
    log.debug("_SendDisplaySettingsResetProgressMsgHandler received", msg); 
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "DisplaySettingsResetProgress")
    {
        this._currentContextTemplate.dialog3Ctrl.setText1(msg.params.payload.u32ItemsComplete + "/" + msg.params.payload.u32ItemsTotal )
    }
}

syssettingsApp.prototype._SendFactoryResetProgressMsgHandler = function(msg)
{
    log.debug("_SendFactoryResetProgressMsgHandler received", msg); 
    if (this._currentContext && this._currentContextTemplate && (this._currentContext.ctxtId === "FacResetProgress" || this._currentContext.ctxtId === "FactoryResetProgress" ))
    {
        this._currentContextTemplate.dialog3Ctrl.setText1(msg.params.payload.u32ItemsComplete + "/" + msg.params.payload.u32ItemsTotal )
    }
}

syssettingsApp.prototype._SetFactoryResetStatus = function()
{
    if(!this._disableSpeedRestricted)
    {
        var factoryResetIndex = this._SystemTabHelperArray["factoryReset"].index;
        if ((this._cachedIgnitionStatus === false) || (this._cachedCANStatus === false))
        {
            this._factoryResetStatus = "Disabled";
            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[factoryResetIndex].disabled = true;
                this._currentContextTemplate.list2Ctrl.updateItems(factoryResetIndex, factoryResetIndex);
            }
        }
        else if ((this._cachedIgnitionStatus === true) && (this._cachedCANStatus === true))
        {
            this._factoryResetStatus = "Enabled";
            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "SystemTab")
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[factoryResetIndex].disabled = false;
                this._currentContextTemplate.list2Ctrl.updateItems(factoryResetIndex, factoryResetIndex);
            }
        }
    }
}

syssettingsApp.prototype._SendLanguageChangeProgressMsgHandler = function(msg)
{
    log.debug("_SendLanguageChangeProgressMsgHandler received", msg); 
    if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "LanguageChangeProgress")
    {
        this._currentContextTemplate.dialog3Ctrl.setText1(msg.params.payload.u32ItemsComplete + "/" + msg.params.payload.u32ItemsTotal )
    }
}


// HUD Tab Hide/Show
syssettingsApp.prototype._HudInstalledStatusHandler = function()
{
    if(this._currentContext)
    {
        switch (this._currentContext.ctxtId)
        {
            case "DisplayTab" :
                if(!this._HUDInstalledStatus)
                {
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 0;
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 7;
                }
                else
                {
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 1;
                    this._contextTable.DisplayTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 8;
                }
                break;
            case "ClockTab" :
                if(!this._HUDInstalledStatus)
                {
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 3;
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 7;
                }
                else
                {
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 4;
                    this._contextTable.ClockTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 8;
                }
                break;
            case "DevicesTab" :
                if(!this._HUDInstalledStatus)
                {
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 5;
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 7;
                }
                else
                {
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 6;
                    this._contextTable.DevicesTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 8;
                }
                break;
            case "SystemTab" :
                if(!this._HUDInstalledStatus)
                {
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfigNoHUD;
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 6;
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 7;
                }
                else
                {
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.tabsConfig = this._tabsConfig;
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.currentlySelectedTab = 7;
                    this._contextTable.SystemTab.controlProperties.List2Ctrl.tabsButtonConfig.numTabs = 8;
                }
                break;
            default:
                log.debug("The context", this._currentContext.ctxtId, "does not have tab settings");
                break;
        }
    }
}

// AtSpeed
syssettingsApp.prototype._AtSpeedMsgHandler = function(msg)
{
    this._disableSpeedRestricted = framework.common.getAtSpeedValue();
    log.debug("_AtSpeedMsgHandler called with speed restriction: " + this._disableSpeedRestricted);
    this._EnableDisableControlItems(); 
}
// NoSpeed
syssettingsApp.prototype._NoSpeedMsgHandler = function(msg)
{
    this._disableSpeedRestricted = framework.common.getAtSpeedValue();
    log.debug("_AtSpeedMsgHandler called with speed restriction: " + this._disableSpeedRestricted);
    this._EnableDisableControlItems(); 
}

syssettingsApp.prototype._vehicleTypeMsgHandler = function(msg)
{
    log.debug("_vehicleTypeMsgHandler received", msg); 
    framework.localize.setVehicleType(msg.params.payload.vtype);
}

/**************************
 * APPSDK METHOD RESPONSE HANDLERS
 **************************/
 

//Connect
syssettingsApp.prototype._ConnectionValueCallbackFn = function(msg)
{
    log.debug("_ConnectionValueCallbackFn called with data from AppSDK");

    //successful AppSDK method response
    if(msg && msg.msgType === 'methodResponse')
    {
        if(msg.params && msg.params.connection)
        {
            this._connectionIn = msg.params.connection;
            log.info("AppSDK connection established with connection Id stored in this._connectionIn = "+this._connectionIn );
        }
        
        //already in preset messages and then connection happens, update the list
        if (this._currentContext && this._currentContext.ctxtId === "PresetMessages")
        {
            var connectionParams = 
            {
            "connection_in": this._connectionIn,
            "context_in": 0,
            "type": 1
            }; 
            //deviceId is usually received from MMUI on phone connected
            framework.sendRequestToAppsdk(this.uiaId, this._getPresetMessagesCallbackFn.bind(this), "msg", "GetPresetMessageList", connectionParams);
        }    
    }
    //error AppSDK method response
    else if(msg && msg.msgType === 'methodErrorResponse')
    {
        log.warn("AppSDK returned the following Error : ", msg.errorType );
    }
}

//GetPresetMessages
syssettingsApp.prototype._getPresetMessagesCallbackFn = function(msg)
{
    log.info("_getPresetMessagesCallbackFn  called with data from AppSDK", msg);

    //successful AppSDK method response
    if(msg && msg.msgType === 'methodResponse')
    {
        if(msg.params && msg.params.list)
        {
            this._cachedPresetMessagesChunk = msg.params.list;
            if (this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "PresetMessages")
            {
                this._populateListCtrl(this._currentContextTemplate);
            }
        }
    }
    //error AppSDK method response
    else if(msg && msg.msgType === 'methodErrorResponse')
    {
        log.warn("AppSDK returned the following Error : ", msg.errorType );
    }
}

/**************************
 * Helper functions
 **************************/
//Enable and Disable the items in control
syssettingsApp.prototype._EnableDisableControlItems = function()
{
    this._disableSpeedRestricted = framework.common.getAtSpeedValue();
    log.debug("_EnableDisableControlItems called with context : ", this._currentContext.ctxtId, " template : ", this._currentContextTemplate.templateName, "and disableSpeedRestricted : ", this._disableSpeedRestricted);
    if (this._currentContext && this._currentContextTemplate)
    {
        switch(this._currentContextTemplate.templateName)
        {
            case "List2Tmplt" :
                var tmplt = this._currentContextTemplate;
                switch (this._currentContext.ctxtId)
                {
                    case "DevicesTab":
                        //Network Management - is only available in Japan region
                        if (tmplt.list2Ctrl.dataList.items[1])
                        {
                            tmplt.list2Ctrl.dataList.items[1].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, tmplt.list2Ctrl.dataList.items.length-1);
                        break;
                    case "DisplayTab":
                        //Brightness
                        if(this._cachedDisplayOverTemperature !=null && this._cachedDisplayOverTemperature !=undefined)
                        {
                            tmplt.list2Ctrl.dataList.items[3].disabled = (this._cachedDisplayOverTemperature);
                        }
                        tmplt.list2Ctrl.updateItems(2, 4);
                        break;
                    case "ClockTab":

                        //GPS Sync
                        tmplt.list2Ctrl.dataList.items[1].disabled = this._disableSpeedRestricted;
                        
                        //Time Format
                        tmplt.list2Ctrl.dataList.items[2].disabled = this._disableSpeedRestricted;
                        
                        var gpsSyncStatus = this._cachedGPSSync === "On" ? true : false;

                        this._EnableDisableClockTabItemsOnGpsSyncStatus(gpsSyncStatus);
                        
                        tmplt.list2Ctrl.updateItems(0, tmplt.list2Ctrl.dataList.items.length-1);
                        break;
                    case "SelectTimeZone":
                        var timeZoneItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for (var i = 0; i < timeZoneItemsCount; i++)
                        {   
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, timeZoneItemsCount - 1)
                        break;
                    case "CommunicationSettings":
                    var communicatinonSettingsItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for (var i = 1; i <= 2; i++)
                        {   
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        //3
                        if(this._cachedDownloadCallText && this._cachedDownloadCallText === "On")
                        {
                            this._CommunicationSettingsCtxtDataList.items[this._CommunicationSettingsHelperArray["smsNotify"].index].disabled = false || this._disableSpeedRestricted ;
                        }
                        else if (this._cachedDownloadCallText && this._cachedDownloadCallText === "Off")
                        {
                            this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["smsNotify"].index].itemStyle = "style01";
                            this._CommunicationSettingsCtxtDataList.items[this._CommunicationSettingsHelperArray["smsNotify"].index].disabled = true;                           
                        }
                        //4
                        var autoDownloadEmailIndex = this._CommunicationSettingsHelperArray["downloadCallEmail"].index;
                        if(autoDownloadEmailIndex)
                        {
                            tmplt.list2Ctrl.dataList.items[autoDownloadEmailIndex].disabled = this._disableSpeedRestricted;
                        }
                        //5
                        var emailNotificationsIndex = this._CommunicationSettingsHelperArray["emailNotify"].index;
                        if(emailNotificationsIndex)
                        {
                            if(this._cachedDownloadCallEmail && this._cachedDownloadCallEmail === "On")
                            {
                                this._CommunicationSettingsCtxtDataList.items[emailNotificationsIndex].disabled = false || this._disableSpeedRestricted ;
                            }
                            else if (this._cachedDownloadCallEmail && this._cachedDownloadCallEmail === "Off")
                            {
                                this._currentContextTemplate.list2Ctrl.dataList.items[this._CommunicationSettingsHelperArray["emailNotify"].index].itemStyle = "style01";
                                this._CommunicationSettingsCtxtDataList.items[emailNotificationsIndex].disabled = true;
                            }
                        }
                        //ON/OFF settings and Ringtone Type
                        //6 to 8
                        var autoDownloadCallHistoryIndex = this._CommunicationSettingsHelperArray["downloadCallHistory"].index;
                        var ringtoneIndex = this._CommunicationSettingsHelperArray["ringtone"].index;
                        for (var i = autoDownloadCallHistoryIndex; i <= ringtoneIndex; i++)
                        {   
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        //9 : Phone Volume
                        var phoneVolumeIndex = this._CommunicationSettingsHelperArray["phoneVolume"].index;
                        if(this._cachedPhoneVolumeControl && this._cachedPhoneVolumeControl === "Enabled")
                        {
                            this._CommunicationSettingsCtxtDataList.items[phoneVolumeIndex].disabled = false || this._disableSpeedRestricted ;
                        }
                        else if (this._cachedPhoneVolumeControl && this._cachedPhoneVolumeControl === "Disabled")
                        {
                            this._CommunicationSettingsCtxtDataList.items[phoneVolumeIndex].disabled = true;
                        }  
                        //10 : VR Volume
                        var vrVolumeIndex = this._CommunicationSettingsHelperArray["vrVolume"].index;
                        if(this._cachedVR_RingtoneVolumeControl && this._cachedVR_RingtoneVolumeControl === "Enabled")
                        {
                            this._CommunicationSettingsCtxtDataList.items[vrVolumeIndex].disabled = false || this._disableSpeedRestricted;
                        }
                        else if (this._cachedVR_RingtoneVolumeControl && this._cachedVR_RingtoneVolumeControl === "Disabled")
                        {
                            this._CommunicationSettingsCtxtDataList.items[vrVolumeIndex].disabled = true;
                        }
                        //Contacts, Preset, Mobile 911, Reset
                        var contactsSortOrderIndex = this._CommunicationSettingsHelperArray["contactsSortOrder"].index;
                        var resetIndex = this._CommunicationSettingsHelperArray["reset"].index;
                        for (var i = contactsSortOrderIndex; i <= resetIndex; i++)
                        {   
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, communicatinonSettingsItemsCount - 1);
                        
                        break;
                    case "ContactsSortOrder":
                        var contactsSortOrderItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for(i=0; i < contactsSortOrderItemsCount; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, contactsSortOrderItemsCount - 1);            
                        break;  
                    case "PresetMessages":
                        var presetMessagesItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for(i=0; i < presetMessagesItemsCount; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, presetMessagesItemsCount - 1);
                        break;
                    case "KeyboardLanguage" :
                        var selectKeyboardItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for(i=0; i < selectKeyboardItemsCount; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, selectKeyboardItemsCount - 1);
                        break;
                    case "SystemTab":
                        systemTabItemCount = tmplt.list2Ctrl.dataList.itemCount;
                        factoryResetIndex = this._SystemTabHelperArray["factoryReset"].index;
                        for(i=0; i < factoryResetIndex; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        
                        //Factory Reset
                        if (this._factoryResetStatus === "Disabled")
                        {
                            tmplt.list2Ctrl.dataList.items[factoryResetIndex].disabled = true;
                        }
                        else
                        {
                            tmplt.list2Ctrl.dataList.items[factoryResetIndex].disabled = this._disableSpeedRestricted;
                        }
                        
                        //About
                        tmplt.list2Ctrl.dataList.items[systemTabItemCount - 1].disabled = this._disableSpeedRestricted;
                        tmplt.list2Ctrl.updateItems(0, systemTabItemCount - 1);
                        break;
                    case "ChangeLanguage": 
                        changeLanguageItemCount = tmplt.list2Ctrl.dataList.itemCount;
                        for(i=0; i < changeLanguageItemCount; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, changeLanguageItemCount - 1);
                        break;
                    case "About" :
                        var aboutItemsCount = tmplt.list2Ctrl.dataList.items.length;
                        for(i=0; i < aboutItemsCount; i++)
                        {
                            tmplt.list2Ctrl.dataList.items[i].disabled = this._disableSpeedRestricted;
                        }
                        tmplt.list2Ctrl.updateItems(0, aboutItemsCount - 1);
                        break;
                    default:
                        log.debug("No Enable/Disable item functionality for this context");
                        break; 
                } 
                break;
            case "Dialog3Tmplt" :
                dialog = this._currentContextTemplate.dialog3Ctrl;
                switch(this._currentContext.ctxtId)
                {
                    //case "DisplaySettingsReset" :
                    //case "DisplaySettingsResetError":
                    case "LanguageConf" :
                    case "UseUKEnglish" :
                    case "LanguageChangeError" :
                    case "FactoryResetConfirm" :
                    case "CommunicationSettingsReset" :
                    case "CommunicationSettingsResetError" :
                        //dialog.setDisabled("button1", this._disableSpeedRestricted);
                        dialog.setDisabled("button2", this._disableSpeedRestricted);
                        break;
                    default :
                        log.debug("No speed restriction in this context");
                }
                break;
            case "ClockSettings2Tmplt" :
                this._currentContextTemplate.clockSettings2Ctrl.setAdjustEnabled(this._disableSpeedRestricted);
                //TODO: Keep above code once control has bool implemented instead of string
                this._currentContextTemplate.clockSettings2Ctrl.setAdjustEnabled(this._disableSpeedRestricted.toString());
                break;
             case "KeyboardTmplt" :
                this._currentContextTemplate.keyboardCtrl.setAtSpeed(this._disableSpeedRestricted);
                break; 
            default :
                console.log('Speed Restriction not applicable to this template');
                break;
        }
    }
}

  
//populate StatusBar control
syssettingsApp.prototype._populateStatusBarCtrl = function()
{
    var time = new Date(this._cachedCurrentTime * 1000);
    var hours = time.getHours();
    var min = time.getMinutes();
    log.debug("_populateStatusBarCtrl called with time : " + hours + " : " + min); 
    if(this._cachedCurrentTime)
    {
        framework.common.updateSbClock(this._cachedCurrentTime * 1000); 
    }
}

syssettingsApp.prototype._communicationSettingsListCreate = function(itemCount)
{
            this.communicationSettingsListItemCount = itemCount;
            
            var communicationSettingsIndex;// Keeps track of index for conditional display removable settings (Distance and Temperature)
            //0 : Bluetooth
            communicationSettingsIndex = 0;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SelectBluetooth', text1Id : 'Bluetooth', itemStyle : 'style01', hasCaret : false};
            this._CommunicationSettingsHelperArray["bluetooth"].index = communicationSettingsIndex;
            //1 : Incoming Call Notification
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetIncomingCallNotify', text1Id : 'IncomingCallNotifications', itemStyle : 'styleOnOff', value : 1, hasCaret : false};
            if (this._cachedIncomingCallNotification != undefined)
            {
                switch (this._cachedIncomingCallNotification)
                {
                    case "On":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break;
                    default :
                        log.debug("Unknown Incoming Call Notification");
                        break;
                 }  
            }
            this._CommunicationSettingsHelperArray["incomingCallNotify"].index = communicationSettingsIndex;
            //2 : Auto Download Text
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetDownloadCallText', text1Id : 'DownloadCallText', itemStyle : 'styleOnOff', value : 1, hasCaret : false};
            if (this._cachedDownloadCallText != undefined)
            {
                switch (this._cachedDownloadCallText)
                {
                    case "On":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break;
                    default:
                        log.debug("Unknown Downloaded Call Text settings");
                        break;
                 }  
            }
            this._CommunicationSettingsHelperArray["downloadCallText"].index = communicationSettingsIndex;
            //3 : SMS notification
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetSMSNotify', text1Id : 'SMSNotifications', itemStyle : 'styleOnOff', value : 1, hasCaret : false }
            if (this._cachedSMSNotification != undefined)
            {
                switch (this._cachedSMSNotification)
                {
                    case "On":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break; 
                    default :
                        log.debug("Unknown SMS Notification");
                        break;
                 }
            }
            this._CommunicationSettingsHelperArray["smsNotify"].index = communicationSettingsIndex;
            
            var region = framework.localize.getRegion();
            if(region != framework.localize.REGIONS['Japan'] && framework.getSharedData('email',"emailSupported"))
            {
            //4 : Auto Download Email
                communicationSettingsIndex++;
                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetDownloadCallEmail', text1Id : 'DownloadCallEmail', itemStyle : 'styleOnOff', value : 1, hasCaret : false};
                if (this._cachedDownloadCallEmail != undefined)
                {
                   switch (this._cachedDownloadCallEmail)
                    {
                       case "On":
                           this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                           break;
                       case "Off":
                           this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                           break;
                       default:
                           log.debug("Unknown Downloaded Call Email settings");
                           break;
                    }  
                }
                this._CommunicationSettingsHelperArray["downloadCallEmail"].index = communicationSettingsIndex;
               //5 : Email notification
                communicationSettingsIndex++;
                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetEmailNotify', text1Id : 'EmailNotifications', itemStyle : 'styleOnOff', value : 1, hasCaret : false }
                if (this._cachedEmailNotification != undefined)
                {
                    switch (this._cachedEmailNotification)
                    {
                       case "On":
                           this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                           break;
                       case "Off":
                           this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                           break; 
                       default :
                           log.debug("Unknown Email Notification");
                           break;
                    }
                }
                this._CommunicationSettingsHelperArray["emailNotify"].index = communicationSettingsIndex;
            }
            else
            {
                this._CommunicationSettingsHelperArray["downloadCallEmail"].index = null;
                this._CommunicationSettingsHelperArray["emailNotify"].index = null;
            }
            //6 : Auto Download Call History
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetDownloadCallHistory', text1Id : 'DownloadCallHistory', itemStyle : 'styleOnOff', value : 1, hasCaret : false};
            if (this._cachedDownloadCallHistory != undefined)
            {
                switch (this._cachedDownloadCallHistory)
                {
                    case "On":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break;
                    default :
                        log.debug("Unknown Download Call History setting");
                        break;
                 }  
            }
            this._CommunicationSettingsHelperArray["downloadCallHistory"].index = communicationSettingsIndex;
            //7 : Auto Download Contacts
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetDownloadCallContacts', text1Id : 'DownloadCallContacts', itemStyle : 'styleOnOff', value : 1, hasCaret : false};
            if (this._cachedDownloadCallContacts != undefined)
            {
                switch (this._cachedDownloadCallContacts)
                {
                    case "On":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break;
                    default :
                        log.debug("Unknown Downloaded Call Contacts settings");
                        break;
                 }  
            }           
            this._CommunicationSettingsHelperArray["downloadCallContacts"].index = communicationSettingsIndex;
            //8 : Ringtone
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SetRingtoneValue', text1Id : 'Ringtone', button1Id : "Fixed", button2Id : "Inband", button3Id : "common.Off", itemStyle : 'style11', value : 2, hasCaret : false};
            if (this._cachedRingToneType)
            {
                switch (this._cachedRingToneType)
                {
                    case "Fixed":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                        break;
                    case "Inband":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                        break;
                    case "Off":
                        this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 3;
                        break;
                    default:
                        log.debug("Unknown Ringtone type.");
                        break;
                 } 
            }
            this._CommunicationSettingsHelperArray["ringtone"].index = communicationSettingsIndex;
            //9 : Phone Volume
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'AdjustRingtoneVolume', text1Id : 'PhoneVolume', hasCaret : false, itemStyle : 'style12', labelLeft: "-", labelCenter: "0", labelRight : "+", value : 1, increment: 1, min:1, max: 63 };
            if (this._cachedHandsfreeVolume != null && this._cachedHandsfreeVolume != undefined)
            {
                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = this._cachedHandsfreeVolume;
            }
            this._CommunicationSettingsHelperArray["phoneVolume"].index = communicationSettingsIndex;           
            //10 : VR Volume
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'AdjustVRVolume', text1Id : 'VRVolume', hasCaret : false, itemStyle : 'style12', labelLeft: "-", labelCenter: "0", labelRight : "+", value : 1, increment: 1, min:1, max: 63 };
            if (this._cachedRingtoneAndVRVolume !=null && this._cachedRingtoneAndVRVolume !=undefined)
            {
                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = this._cachedRingtoneAndVRVolume;
            }
            this._CommunicationSettingsHelperArray["vrVolume"].index = communicationSettingsIndex;
            //11 : Contacts Sort Order
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SelectContactsSortOrder', text1Id : 'ContactsSortOrder',   itemStyle : 'style01' , hasCaret : false}
            this._CommunicationSettingsHelperArray["contactsSortOrder"].index = communicationSettingsIndex;
            //12 : Preset Messages
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'SelectPresetMessages', text1Id : 'PresetMessages',   itemStyle : 'style01' , hasCaret : false}
            this._CommunicationSettingsHelperArray["presetMessages"].index = communicationSettingsIndex;
            //13 : Mobile Emergency
            switch(this._CommunicationSettingsHelperArray['mobileEmergency'].display)
            {
                case "Unavailable":
                    //do not add to list
                    this._CommunicationSettingsHelperArray["mobileEmergency"].index = null;
                    break;
                case "Available":
                    communicationSettingsIndex++;
                    this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'MobileEmergencyNumber', text1Id : 'Mobile911',   itemStyle : 'styleOnOff', value : 1 , hasCaret : false}
                    if (this._cachedMob911 != undefined)
                    {
                        switch (this._cachedMob911)
                        {
                            case "On":
                                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 1;
                                break;
                            case "Off":
                                this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex].value = 2;
                                break;
                            default:
                                log.debug("Unknown Emergency Contact setting.");
                                break;
                        }
                    }
                    this._CommunicationSettingsHelperArray["mobileEmergency"].index = communicationSettingsIndex;
                    break;
                default:
                    log.debug("Unknown Mobile Phone 911 Enabled Status");
                    break;
            }
            //14 : Reset
            communicationSettingsIndex++;
            this._CommunicationSettingsCtxtDataList.items[communicationSettingsIndex] = { appData : 'ResetComSettingsConf', text1Id : 'Reset',   itemStyle : 'style01' , hasCaret : false},
            this._CommunicationSettingsHelperArray["reset"].index = communicationSettingsIndex;
            
            //Update the new list.
            this._CommunicationSettingsCtxtDataList.itemCount = communicationSettingsIndex + 1;
}

//populate List control
syssettingsApp.prototype._populateListCtrl = function(tmplt)
{
    this._isListChanged = false;
    log.debug("_populateListCtrl called for context : " + this._currentContext.ctxtId); 

    switch (this._currentContext.ctxtId)            
    {
        case "DisplayTab":
            //Mode
            if (this._cachedDayNightMode)
            {
                switch (this._cachedDayNightMode)
                {
                    case "Auto":
                        tmplt.list2Ctrl.dataList.items[2].value = 1;
                        break;
                    case "Day":
                        tmplt.list2Ctrl.dataList.items[2].value = 2;
                        break;
                    case "Night":
                        tmplt.list2Ctrl.dataList.items[2].value = 3;
                        break;
                    default:
                        log.debug("Unknown Mode Setting.");
                        break;
                 } 
            }
            
            //Brightness
            if (this._cachedBrightness != null && this._cachedBrightness != undefined)
            {
                tmplt.list2Ctrl.dataList.items[3].value = this._cachedBrightness;
            }
            
            //Contrast
            if (this._cachedContrast != null && this._cachedContrast != undefined)
            {
                tmplt.list2Ctrl.dataList.items[4].value = this._cachedContrast;
            }
            
            //Update list Items in _EnableDisableControlItems
            //tmplt.list2Ctrl.updateItems(2, 4);
            break;
        case "ClockTab":
            //GPS Sync
            if (this._cachedGPSSync)
            {
                switch (this._cachedGPSSync)
                {
                    case "On":
                        tmplt.list2Ctrl.dataList.items[1].value = 1;
                        break;
                    case "Off":
                        tmplt.list2Ctrl.dataList.items[1].value = 2;
                        break; 
                    default:
                        log.debug("Unknown GPS Setting");
                        break;
                 }
            }

            //Time Format
            if (this._cachedTimeFormat)
            {
                switch (this._cachedTimeFormat)
                {
                    case "hrs12":
                        tmplt.list2Ctrl.dataList.items[2].value = 1;
                        break;
                    case "hrs24":
                        tmplt.list2Ctrl.dataList.items[2].value = 2;
                        break;
                    default :
                        log.debug("Unknown Clock Settings Format");
                        break;
                 }  
            }
            
            //Set Selected Time Zone 
            if (this._cachedTimeZoneIndex!= null && this._cachedTimeZoneIndex!= undefined)
            { 
                tmplt.list2Ctrl.dataList.items[3].label1Id = this._SelectTimeZoneCtxtDataList.items[this._cachedTimeZoneIndex].text1Id;   
            }
            
            //Daylight Savings Time
            var region = framework.localize.getRegion();
            if(region === framework.localize.REGIONS['4A'] || region === framework.localize.REGIONS['Europe'] || region === framework.localize.REGIONS['NorthAmerica'])
            {
                tmplt.list2Ctrl.dataList.items[4] = { appData : 'SetDaylightSavingTime', text1Id : 'DayLightSavingsTime', itemStyle : 'styleOnOff', value : 2, hasCaret : false };
                tmplt.list2Ctrl.dataList.itemCount = 5;
                if (this._cachedDayLightSavingsTime)
                {
                    switch (this._cachedDayLightSavingsTime)
                    {
                        case "On":
                            tmplt.list2Ctrl.dataList.items[4].value = 1;
                            break;
                        case "Off":
                            tmplt.list2Ctrl.dataList.items[4].value = 2;
                            break; 
                        default:
                            log.debug("Unknown DST Setting");
                            break;
                     }
                }
            }
            tmplt.list2Ctrl.setDataList(tmplt.list2Ctrl.dataList);
            //Update list Items in _EnableDisableControlItems
            //tmplt.list2Ctrl.updateItems(1, 4);
            break;
        case "SelectTimeZone":
            if (this._cachedTimeZoneIndex != undefined && this._cachedTimeZoneIndex != null)
            {
                tmplt.list2Ctrl.properties.focussedItem = this._cachedTimeZoneIndex;
                tmplt.list2Ctrl.setRadio(this._cachedTimeZoneIndex, true);
            }
            break;
        case "CommunicationSettings":
            this._communicationSettingsListCreate(tmplt.list2Ctrl.dataList.itemCount);

            tmplt.list2Ctrl.setDataList(this._CommunicationSettingsCtxtDataList);

            if(this.communicationSettingsListItemCount != tmplt.list2Ctrl.dataList.itemCount)
            {
                this._isListChanged = true;
            }
            break;
        case "ContactsSortOrder":
            if (this._cachedContactsSortOrder != undefined)
            {
                tmplt.list2Ctrl.setRadio(this._cachedContactsSortOrder, true);
            }
            break;  
        case "PresetMessages":
            var dataList = null;
            var items = new Array(); 
            var itemsCount = 0;
            if (this._cachedPresetMessagesChunk.presetMessages)
            {
                for(i = 0; i < this._cachedPresetMessagesChunk.presetMessagesCount;i++)
                {
                    items.push({
                        appData : "SelectPresetMessageFromList",
                        text1: this._cachedPresetMessagesChunk.presetMessages[i],
                        hasCaret: false,
                        itemStyle : "style01"
                    });
                    
                }
                dataList = {
                    itemCountKnown : true, 
                    itemCount : items.length,
                    items : items
                };
            }
            tmplt.list2Ctrl.setDataList(dataList);
            //Update list Items in _EnableDisableControlItems
            //tmplt.list2Ctrl.updateItems(0, dataList.itemCount-1); 
            break;
        case "KeyboardLanguage" :
            this._createDisplayList(tmplt);
            //Update list Items in _EnableDisableControlItems
            //tmplt.list2Ctrl.updateItems(0, dataList.itemCount-1); 
            break;
        case "SystemTab":
            systemTabListItemCount = tmplt.list2Ctrl.dataList.itemCount;
            if(this._SystemTabCtxtDataList && this._SystemTabCtxtDataList.items)
            {
                var systemTabIndex;// Keeps track of index for conditional display removable settings (Distance and Temperature)
                systemTabIndex = 0;
                //Tool Tips
                this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SetToolTips', text1Id : 'ToolTips', itemStyle : 'styleOnOff', value : 2, hasCaret : false};
                switch(framework.getSharedData(this.uiaId, "ToolTips"))
                {
                    case true:
                        this._SystemTabCtxtDataList.items[systemTabIndex].value = 1;
                        break;
                    case false:
                        this._SystemTabCtxtDataList.items[systemTabIndex].value = 2;
                        break;
                    default:
                        log.debug("Unknown ToolTips Setting.");
                        break;  
                }
                this._SystemTabHelperArray["toolTips"].index = systemTabIndex;
                //Language
                var region = framework.localize.getRegion();
                //Remove this entry for Japan region since there is only 1 language supported.
                if(region != framework.localize.REGIONS['Japan'])
                {
                    systemTabIndex++;
                    this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SelectChangeLanguage', text1Id : 'Language',   label1 : '', itemStyle : 'style06'};
                    if (this._cachedLanguageSupported)
                    {
                        this._SystemTabCtxtDataList.items[systemTabIndex].label1Id = this._cachedLanguageSupported;
                    }
                    this._SystemTabHelperArray["language"].index = systemTabIndex;
                }
                //Temperature
                if (this._SystemTabHelperArray["temperature"].display === 1)
                {
                    systemTabIndex++;
                    this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SetUnitsTemperature', text1Id : 'Temp', button1Id : "Fahrenheit", button2Id : "Celsius", itemStyle : 'style10', value : 2, hasCaret : false};
                    if (this._cachedTemperature)
                    {
                        switch (this._cachedTemperature)
                        {
                            case "Fahrenheit":
                                this._SystemTabCtxtDataList.items[systemTabIndex].value = 1;
                                break;
                            case "Celsius":
                                this._SystemTabCtxtDataList.items[systemTabIndex].value = 2;
                                break;
                            default:
                                log.debug("Unknown Temperature Unit.");
                                break;
                        }   
                    }
                    this._SystemTabHelperArray["temperature"].index = systemTabIndex;
                }
                //Distance
                if(this._SystemTabHelperArray["distance"].display === 1)
                {
                    systemTabIndex++;
                    this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SetUnitsDistance', text1Id : 'Distance', button1Id : "Miles", button2Id : "Kilometers", itemStyle : 'style10', value : 2, hasCaret : false};
                    if (this._cachedDistance)
                    {
                        switch (this._cachedDistance)
                        {
                            case "Miles":
                                this._SystemTabCtxtDataList.items[systemTabIndex].value = 1;
                                break;
                            case "Kilometers":
                                this._SystemTabCtxtDataList.items[systemTabIndex].value = 2;
                                break;
                            default:
                                log.debug("Unknown Distance Unit.");
                                break;
                        } 
                    }
                    this._SystemTabHelperArray["distance"].index = systemTabIndex;
                }
                //Music Database Update
                systemTabIndex++;
                this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SelectMusicDatabaseUpdate', text1Id : 'MusicDatabaseUpdate',   itemStyle : 'style01', hasCaret : false}
                this._SystemTabHelperArray["musicDatabaseUpdate"].index = systemTabIndex;
                //Factory Reset
                systemTabIndex++;
                this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SelectFactoryReset', text1Id : 'FactoryReset',   itemStyle : 'style01', hasCaret : false  }
                this._SystemTabHelperArray["factoryReset"].index = systemTabIndex;
                //About
                systemTabIndex++;
                this._SystemTabCtxtDataList.items[systemTabIndex] = { appData : 'SelectAbout', text1Id : 'About',   itemStyle : 'style01', hasCaret : false };
                this._SystemTabHelperArray["about"].index = systemTabIndex;
                //Populate Removable List
                this._SystemTabCtxtDataList.itemCount = systemTabIndex + 1;
                tmplt.list2Ctrl.setDataList(this._SystemTabCtxtDataList);
                //Update list Items in _EnableDisableControlItems
                //tmplt.list2Ctrl.updateItems(0,systemTabIndex);
                if(systemTabListItemCount != tmplt.list2Ctrl.dataList.itemCount)
                {
                    this._isListChanged = true;
                }
                break;
            }
        case "ChangeLanguage": 
            var dataList = null;
            var items = new Array(); 
            var itemsCount = 0;
            if (this._cachedLanguagesList)
            {
                for (var i = 0; i < this._cachedLanguagesList.length; i++)
                {
                    var currentLanguageID = this._cachedLanguagesList[i].languageID
                    var isSelected;
                    var isVrSupported;
                    var isTtsSupported;
                    var focussedItemIndex;
                    if (this._cachedLanguageSupported && currentLanguageID !='undefined' && currentLanguageID !='UNKNOWN UIA_SYSSETTINGS_Languages') 
                    {
                        isSelected = false;
                        isVrSupported = this._cachedLanguagesList[i].vrSupport;
                        isTtsSupported = this._cachedLanguagesList[i].ttsSupport;
                        if(currentLanguageID === this._cachedLanguageSupported)
                        {
                            isSelected = true;
                            focussedItemIndex = i;
                        }
                        items.push({ 
                            appData : "SelectLanguageConf",
                            text1Id: currentLanguageID,
                            hasCaret: false,
                            vrSupport : isVrSupported,
                            ttsSupport : isTtsSupported,
                            checked : isSelected,
                            image1: 'radio',
                            image3 : (isVrSupported ? 'apps/syssettings/images/voice_recognition.png' : null),
                            itemStyle : "style03"
                        });
                        itemsCount = itemsCount +1
                    }
                }
                dataList = {
                    itemCountKnown : true, 
                    itemCount : itemsCount,
                    items : items
                };
            }
            tmplt.list2Ctrl.setDataList(dataList);
            tmplt.list2Ctrl.properties.focussedItem = focussedItemIndex;
            //Update list Items in _EnableDisableControlItems
            //tmplt.list2Ctrl.updateItems(0, dataList.itemCount-1); 
            break;
        case "DevicesTab":
            var dataList = null;
            var items = new Array(); 
            var region = framework.localize.getRegion();
            
            //DEVICES TAB
            // Bluetooth is available in all regions
            items.push({
                appData : 'SelectBluetooth',
                text1Id : 'Bluetooth',
                itemStyle : 'style01',
                hasCaret: false
            });
            if((region != (framework.localize.REGIONS['Japan']) && (region != (framework.localize.REGIONS['Japan']))))
            {// Wi-fi is not available in Japan and NorthAmerica region
                items.push({
                    appData : 'SelectNetworkManagement',
                    text1Id : 'NetworkManagement',
                    hasCaret : false,
                    itemStyle : 'style01'
                });                    
            }
            
            dataList = {
                itemCountKnown : true, 
                itemCount : items.length,
                items : items
            };

            tmplt.list2Ctrl.setDataList(dataList);
            //Update list Items in _EnableDisableControlItems
            break;
        default:
            log.debug("Do nothing");
            break; 
    }
    //Check for speed-restricted behaviour and other enabling/disabling signals
    this._EnableDisableControlItems();
}

syssettingsApp.prototype.sharedDataChanged = function(uiaId, name, value)
{
    if(uiaId)
    {
        switch (uiaId)
        {
            case "vehsettings":
                if(name)
                {
                    switch (name)
                    {
                        case "IgnitionStatus" :
                            this._cachedIgnitionStatus = value;
                            this._SetFactoryResetStatus();
                            break;
                        case "CanStatus" :
                            this._cachedCANStatus = value;
                            this._SetFactoryResetStatus();
                            break;
                        case "HudInstalled":
                            this._HUDInstalledStatus = value;
                            this._HudInstalledStatusHandler();
                            break;
                        default:
                            log.debug("Shared Data subscribed for uiaId: ", uiaId, " with name: ", name, ", has been changed to value: ", value);
                            break;
                    }
                }
                break;
            case "email":
                if(name)
                {
                    switch (name)
                    {
                        case "emailSupported":
                            if(this._currentContext && this._currentContextTemplate && this._currentContext.ctxtId === "CommunicationSettings")
                            {
                                this._populateListCtrl(this._currentContextTemplate); ;
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            default:
                log.debug("Shared Data subscribed for uiaId: ", uiaId, " with name: ", name, ", has been changed to value: ", value);
                break;
        }
    }
}

syssettingsApp.prototype.getKeyboardLangInGuiFormat= function(enumKey)
{
    return this.KEYBOARD_LANG_CODES[enumKey];
}

syssettingsApp.prototype._createDisplayList= function(tmplt)
{
    var dataList = null;
    var recentLanguageId = 'Recent';
    var items = new Array(); 
    var itemsCount = 0;
    var itemChecked = false;
    var focussedItemIndex;
    if (this._cachedRecentKeyboardLanguagesList && this._cachedKeyboardLanguage)
    {
       for (var i = 0; i < this._cachedRecentLanguagesNumber ; i++)
       {
               var keyboardLanguageID = this._cachedRecentKeyboardLanguagesList[i];
               if(keyboardLanguageID && this.KEYBOARD_LANG_CODES[keyboardLanguageID])
               {
                   if(keyboardLanguageID === this._cachedKeyboardLanguage)
                   {
                       itemChecked = true;
                       focussedItemIndex = items.length;
                   }
                   else
                   {
                       itemChecked = false;
                   }
                   items.push({ 
                   appData : "SelectKeyboardLanguage",
                   text1Id: keyboardLanguageID,
                   label1Id: recentLanguageId,
                   hasCaret: false,
                   image1: 'radio',
                   checked : itemChecked,
                   itemStyle : "style03a"
                   });
               }
       }
       for (i in this._cachedKeyboardLanguagesList)
       {
               var redundantLanguageId = false;
               var keyboardLanguageID = this._cachedKeyboardLanguagesList[i];
               if(keyboardLanguageID && this.KEYBOARD_LANG_CODES[keyboardLanguageID])
               {
                   for (var j = 0; j < this._cachedRecentLanguagesNumber ; j++)
                   {
                        if(keyboardLanguageID == this._cachedRecentKeyboardLanguagesList[j])
                        {
                            redundantLanguageId = true;
                        }
                   }
                   if(redundantLanguageId == false)
                   {
                        if(keyboardLanguageID === this._cachedKeyboardLanguage)
                        {
                            itemChecked = true;
                            focussedItemIndex = items.length;
                        }
                        else
                        {
                            itemChecked = false;
                        }
                  
                        items.push({ 
                        appData : "SelectKeyboardLanguage",
                        text1Id: keyboardLanguageID,
                        hasCaret: false,
                        image1: 'radio',
                        checked : itemChecked,
                        itemStyle : "style03"
                        });
                   }
               }
       }
       
       dataList = {
          itemCountKnown : true, 
          itemCount : items.length,
          items : items
       };
    }
    tmplt.list2Ctrl.setDataList(dataList);
    tmplt.list2Ctrl.properties.focussedItem = focussedItemIndex;
    this._contextTable["KeyboardLanguage"].controlProperties.List2Ctrl.focussedItem = focussedItemIndex;
}

syssettingsApp.prototype._EnableDisableClockTabItemsOnGpsSyncStatus = function(gpsSyncStatus)
{

    this._disableSpeedRestricted = framework.common.getAtSpeedValue();
    
    if (this._currentContextTemplate && this._currentContextTemplate.list2Ctrl && this._currentContextTemplate.list2Ctrl.dataList)
    {
        //Adjust Time
        this._currentContextTemplate.list2Ctrl.dataList.items[0].disabled = gpsSyncStatus || this._disableSpeedRestricted;

        // if GPS sync is false, enable based on speed restriction
        if (false === gpsSyncStatus)
        {
            this._currentContextTemplate.list2Ctrl.dataList.items[3].disabled = this._disableSpeedRestricted;
            //Daylight Savings Time - if present for EU,NA and 4A regions
            if(this._currentContextTemplate.list2Ctrl.dataList.items[4])
            {
                this._currentContextTemplate.list2Ctrl.dataList.items[4].disabled = this._disableSpeedRestricted;
            }
        }
        // if GPS sync is available, enable based on Navi status and speed
        else if (true === gpsSyncStatus)
        {
            // if navi is available, disable the entries
            if (this._cachedNaviStatus === "Available")
            {        
                this._currentContextTemplate.list2Ctrl.dataList.items[3].disabled = true;
                //Daylight Savings Time - if present for EU,NA and 4A regions
                if(this._currentContextTemplate.list2Ctrl.dataList.items[4])
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[4].disabled = true;
                }
            }
            // if navi is not available, enable the entries based on speed.
            else if (this._cachedNaviStatus === "Unavailable")
            {        
                this._currentContextTemplate.list2Ctrl.dataList.items[3].disabled = this._disableSpeedRestricted;
                //Daylight Savings Time - if present for EU,NA and 4A regions
                if(this._currentContextTemplate.list2Ctrl.dataList.items[4])
                {
                    this._currentContextTemplate.list2Ctrl.dataList.items[4].disabled = this._disableSpeedRestricted;
                }
            }
        }
        this._currentContextTemplate.list2Ctrl.updateItems(0, this._currentContextTemplate.list2Ctrl.dataList.items.length-1);
    }
}

//Tell framework this .js file has finished loading 
framework.registerAppLoaded("syssettings", null, true);
