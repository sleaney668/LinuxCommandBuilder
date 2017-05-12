export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "

	static dataObject: Object = {"linuxCategories":[
								["touch","mkdir","useradd","groupadd","ln"], //Add
								["rm","rmdir","userdel","groupdel","rm"], //Delete
							    [["mv","mv","vi","touch -a","touch -m","chmod","chown"], //Modify > File
							     ["mv","touch -a","touch -m","chmod","chown"], //Modify > directory
							     ["usermod -l","passwd","usermod -u"], //Modify > User
							     ["groupmod -n","groupmod -g"], //Modify > Group
							     ["ln -sf"]], // Modify > Link     
							    [["cat", "stat", "tail"], // View > File
							     ["ls", "stat"], // View > Directory
							     ["groups","?"], // View > Group
							     ["ps", "lsof", "top"] // View > Processes
							    ], 
							    ["ps aux","find / -name","pwd","groups","w"], //Locate
							    ["cp"], //Copy
							    ["type","bc","ls"]]}; //Misc

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy.Misc`;

	static addSearch: string = `File.Directory.User.Group.Link`;

	static deleteSearch: string = `File.Directory.User.Group.Link`;

	static modifySearch: string = `File.Directory.User.Group.Link`;
	// Added space to sub searches so as they are not euqal to their parent div
	static modifyFileSubSearch: string = ` Name. Location. Contents. Accessed time. Modified time. Permissions. Ownership`;
	static modifyDirectorySubSearch: string = ` Name. Accessed time. Modified time. Permissions. Ownership`;
	static modifyUserSubSearch: string = ` Name. Password. UID`;
	static modifyGroupSubSearch: string = ` Name. GID`;
	static modifyLinkSubSearch: string = ` Symbolic link`;

	static viewSearch: string =  `File.Directory.Group.Processes`;
		// Added space to sub searches so as they are not euqal to their parent div
	static viewFileSubSearch: string = ` Contents. Status. Log file`;
	static viewDirectorySubSearch: string = ` Contents. Status`;
	static viewGroupSubSearch: string = ` All group's. User group's`;
	static viewProcessesSubSearch: string = ` All processes. Port processes. Top processes`;

	static locateSearch: string = `File.Directory.Location.Users.Logged In`;
	
	static copySearch: string = `File/Directory`;

	static miscSearch: string = `Command.Calculator.List`;

	static commandDict = {
		"touch":"Create file",
	    "mkdir":"Make directory",
	    "useradd":"Add user",
	    "groupadd":"Add group",
	    "ln":"Create link",
	    "alias":"Create alias",

	   	"rm":"Remove",
	   	"rmdir":"Remove directory",
	   	"userdel":"Delete user",
	   	"groupdel":"Delete group",

		"mv":"Move/Rename",
		"vi":"Text editor",
		"touch -a":"Change accessed time",
		"touch -m":"Change modified time",
		"usermod -l":"Modify username",
		"passwd":"Modify password",
		"usermod -u":"Modify user ID",
		"groupmod -n":"Modify group name",
		"groupmod -g":"Modify group ID",
		"ln -sf":"Modify symbolic link",
	    "chmod":"Change mode",
	    "chown":"Change ownership",

	    "cat":"Print file contents",
	    "stat":"Status information",
	    "ls":"List diretory content's",
	}

	static optionValues = {"ps":["e","a","f","x","r","eaf","aux"],
						   "lsof":["i","g","p","u"]
						  };
    
    static searchTermRender = {
    	"File":"file name",
    	"Directory":"directory name",
    	"User":"user name",
    	"Group":"group name",
    	"Link":"link name",
    	" Name.":"{old name} {new name}",
    	" Location.":"{old destination} {new destination}",
    	" Contents.":"file/directory name",
    	" Accessed time.":"file/directory name",
    	" Modified time.":"file/directory name",
    	" Permissions.":"file/directory name",
    	" Ownership.":"file/directory name",

    	" Symbolic link.":"{target} {path to symbolic link}",

    	" Status.":"file/directory name",


    };

}




