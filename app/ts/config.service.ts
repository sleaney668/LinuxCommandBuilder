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
							     ["id","id -u","id -un","id -F"], // View > User
							     ["id -g","id -gn","id -G","id -Gn"], // View > Group
							     ["ps", "lsof", "top"] // View > Processes
							    ], 
							    ["find","pwd"], //Locate
							    ["cp"], //Copy
							    ["type","bc","ls"]]}; //Misc

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy.Misc`;

	static addSearch: string = `File.Directory.User.Group.Link`;

	static deleteSearch: string = `File.Directory.User.Group.Link`;

	static modifySearch: string = `File.Directory.User.Group.Link`;
	// Added space to sub searches so as they are not euqal to their parent div
	static modifyFileSubSearch: string = ` Name. Location. Contents. Accessed time. Modified time. Permissions. Ownership`;
	static modifyDirectorySubSearch: string = ` Name. Accessed time. Modified time. Permissions. Ownership`;
	static modifyUserSubSearch: string = ` Name. Password. User ID`;
	static modifyGroupSubSearch: string = ` Name. Group ID`;
	static modifyLinkSubSearch: string = ` Symbolic link`;

	static viewSearch: string =  `File.Directory.User.Group.Processes`;
		// Added space to sub searches so as they are not euqal to their parent div
	static viewFileSubSearch: string = ` Contents. Status. Log file`;
	static viewDirectorySubSearch: string = ` Contents. Status`;
	static viewUserSubSearch: string = ` All user information. User ID. Username. Full name`;
	static viewGroupSubSearch: string = ` User's primary group ID. User's primary group name. User's secondary group ID's. User's secondary group names`;
	static viewProcessesSubSearch: string = ` Current running processes. Open file processes. Top processes`;

	static locateSearch: string = `File.Working directory`;
	
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
	    "tail":"Print lines of file",

	    "id":"All user information",
	    "id -un":"Display username",
	    "id -u":"Display user ID",
	    "id -F":"Display full name",
	    //"usermod -":"Displays the last part of a file"

	    "id -G":"Display user's secondary group ID's",
	    "id -g":"Display user's primary group ID",
	    "id -Gn":"Display user's secondary group names",
	    "id -gn":"Display user's primary group name",

	    "ps":"Display processes",
	    "lsof":"List open files",
	    "top":"Display top processes",

	    "find":"Find file",
	    "pwd":"Print working directory"
	}

	static optionValues = {"ps":["-e","-a","-f","-x","-r","-eaf","-aux"],
						   "lsof":["-i","-i:","-u","-p","+d","-t"],
						   "tail":["-","-f"]
						  };
    
    static searchTermRender = {
    	"Add >File":"filename...",
    	"Add >Directory":"directory name...",
    	"Add >User":"username...",
    	"Add >Group":"group name...",
    	"Add >Link":"link name...",

    	"Delete >File":"filename...",
    	"Delete >Directory":"directory name...",
    	"Delete >User":"username...",
    	"Delete >Group":"group name...",
    	"Delete >Link":"link name...",

    	"Modify > Name.":"Enter {old name} {new name}",
    	"Modify > Location.":"Enter {old destination} {new destination}",
    	"Modify > Contents.":"file/directory name...",
    	"Modify > Accessed time.":"file/directory name...",
    	"Modify > Modified time.":"file/directory name...",
    	"Modify > Permissions.":"file/directory name...",
    	"Modify > Ownership.":"file/directory name...",
    	"Modify > User ID.":"Enter {new ID} {user name}",
    	"Modify > Password.":"username...",
    	"Modify > Group ID.":"Enter {new ID} {group name}",
    	"Modify > Symbolic link.":"Enter {target} {path to symbolic link}",

		// VIEW SEARCH TERMS RENDERS
		"View > Contents.":"file/directory name...",
    	"View > Status.":"file/directory name...",
    	"View > Log file.":"Follow steps...",
    	"View > All user information.":"Run command or enter username...",
    	"View > Username.":"Run command...",
    	"View > User ID.":"username...",
    	"View > Full name.":"Run command...",

    	"View > User's primary group ID.":"Run command or enter username...",
    	"View > User's primary group name.":"Run command or enter username...",
		"View > User's secondary group ID's.":"Run command or enter username...",
		"View > User's secondary group names.":"Run command or enter username...",

    	"View > Current running processes.":"Follow steps...",
    	"View > Open file processes.":"Follow steps...",
    	"View > Top processes.":"Run command...",

    	"Locate >File":"Run command or enter filename...",
    	"Locate >Working directory":"Run command...",
    };

    static disabledSearchTerms: string = "Top processes - Username - Full name - Working directory";
}




