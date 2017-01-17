export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "
	//static dataObject: Object = {"linuxCategories":[{"add":[{"directory":"mkdir"},{"directory1":"mkdir"},{"directory2":"mkdir"}]},{"delete":"object"},{"modify":"object"},{"view":"object"},{"locate":"object"},{"copy":"object"}]};

	static dataObject: Object = {"linuxCategories":[
								["touch","mkdir","useradd","groupadd","ln"],
								["rm","rmdir","userdel","groupdel","rm"],
							    [["mv","mv","vi","touch -a","touch -m","dd"],
							     ["mv","touch -a","touch -m"],
							     ["usermod -l","passwd"],
							     ["chmod"],
							     ["chown"]],
							    ["cat","stat","ls","groups","tail","top","lsof -i :","ps -eaf"],
							    ["ps aux","find / -name","pwd","groups","w"],
							    ["cp"],
							    ["type","bc","ls"]]};

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy.Misc`;

	static addSearch: string = `File.Directory.User.Group.Link`;

	static deleteSearch: string = `File.Directory.User.Group.Link`;

	static modifySearch: string = `File.Directory.User.Permissions.Ownership`;

	// Added space to sub searches so as they are not euqal to their parent div
	static modifyFileSubSearch: string = ` Name. Location. Contents. Accessed. Modified .Convert`;
	static modifyDirectorySubSearch: string = ` Name. Accessed. Modified`;
	static modifyUserSubSearch: string = ` Name. Password`;
	static modifyPermissionsSubSearch: string = ` File/Directory`;
	static modifyOwnershipSubSearch: string = ` File/Directory`;


	static viewSearch: string = `File.Stats.Directory.Groups.Logs.Processes.Port.All Processes`;

	static locateSearch: string = `File.Directory.Location.Users.Logged In`;
	
	static copySearch: string = `File/Directory`;

	static miscSearch: string = `Command.Calculator.List`;

	static commandDict = {
		"touch": "Create file",
	    "mkdir": "Make directory",
	    "useradd": "Add user",
	    "groupadd": "Add group",
	    "ln": "Create link",
	    "alias": "Create alias",

	   	"rm":"Remove",
	   	"rmdir":"Remove directory",
	   	"userdel":"Delete user",
	   	"groupdel":"Delete group",

		"mv":"Modify name/location",
		"vi":"Modify contents",
		"touch -a":"Modify last accessed",
		"touch -m":"Modify last modified",

		"usermod -l":"Modify username",
		"passwd":"Modify password",

	    "chmod":"Change mode"
	}

	static mkdirTreeValues = "tmdir/{branches/sources/{includes,docs}branches,tags}";
	// Value before first index of / is li #1
	// after is new ul, if next char is { then 
}