export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "
	//static dataObject: Object = {"linuxCategories":[{"add":[{"directory":"mkdir"},{"directory1":"mkdir"},{"directory2":"mkdir"}]},{"delete":"object"},{"modify":"object"},{"view":"object"},{"locate":"object"},{"copy":"object"}]};

	static dataObject: Object = {"linuxCategories":[["mkdir","touch","useradd","groupadd"],["rm","rmdir","userdel","groupdel","rm -r"],[["mv","vi","touch -a","touch -m"],["mv","touch -a","touch -m"],["usermod -l","passwd"],["chmod"],["chown"]],["cat","stat","ls","tail","top","lsof -i :","ps -eaf"],["ps aux","?","pwd","?","w || who"],["cp","cp"]]};

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy`;

	static addSearch: string = `File.Directory.User.Group`;

	static deleteSearch: string = `File.Directory.User.Group.Application`;

	static modifySearch: string = `File.Directory.User.Permissions.Ownership`;

	// Added space to sub searches so as they are not euqal to their parent div
	static modifyFileSubSearch: string = ` Name/Location. Contents. Accessed. Modified`;
	static modifyDirectorySubSearch: string = ` Name. Accessed. Modified`;
	static modifyUserSubSearch: string = ` Name. Password`;
	static modifyPermissionsSubSearch: string = ` File. Directory`;
	static modifyOwnershipSubSearch: string = ` File. Directory`;


	static viewSearch: string = `File.Stats.Directory.Logs.Processes.Port.AllProcesses`;

	static locateSearch: string = `File.Directory.Location.Users.LoggedIn`;
	
	static copySearch: string = `File/Directory`;

	static commandDict = {
	    "mkdir": "Make directory",
	    "touch": "Make file",
	    "useradd": "Add user",
	    "groupadd": "Add group",

	   	"rm":"Delete file",
	   	"rmdir":"Delete directory",
	   	"userdel":"Delete user",
	   	"groupdel":"Delete group",
	   	"rm -r":"Delete application",

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