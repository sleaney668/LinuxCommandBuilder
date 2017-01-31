export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "
	//static dataObject: Object = {"linuxCategories":[{"add":[{"directory":"mkdir"},{"directory1":"mkdir"},{"directory2":"mkdir"}]},{"delete":"object"},{"modify":"object"},{"view":"object"},{"locate":"object"},{"copy":"object"}]};

	static dataObject: Object = {"linuxCategories":[
								["touch","mkdir","useradd","groupadd","ln"], //Add
								["rm","rmdir","userdel","groupdel","rm"], //Delete
							    [["mv","mv","vi","touch -a","touch -m","chmod","chown"], //Modify > File
							     ["mv","touch -a","touch -m","chmod","chown"], //Modify > directory
							     ["usermod -l","passwd","usermod -u"], //Modify > User
							     ["groupmod -n","groupmod -g"], //Modify > Group
							     ["ln -sf"]], // Modify > Link
							    ["cat","stat","ls","groups","tail","top","lsof -i :","ps -eaf"], //View
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


	static viewSearch: string = `File.Stats.Directory.Groups.Logs.Processes.Port.All Processes`;

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

	    "chmod":"Change mode"
	}

	static mkdirTreeValues = "tmdir/{branches/sources/{includes,docs}branches,tags}";
	// Value before first index of / is li #1
	// after is new ul, if next char is { then 
}