export class Config{
	static MAIN_HEADING: string = " | Linux Command Builder | "
	//static dataObject: Object = {"linuxCategories":[{"add":[{"directory":"mkdir"},{"directory1":"mkdir"},{"directory2":"mkdir"}]},{"delete":"object"},{"modify":"object"},{"view":"object"},{"locate":"object"},{"copy":"object"}]};

	static dataObject: Object = {"linuxCategories":[["mkdir","touch","user add"],["rmdir","n/a","rm","n/a"],[["chmod OR chown","chmod OR chown"],["rename","nano OR vim","n/a"]],["ls","tail","cat","All processes"],["ps aux"],["SCP"]]};

	static categoriesSearch: string = `Add.Delete.Modify.View.Locate.Copy`;
	static addSearch: string = `Directory.File.User`;
	static deleteSearch: string = `Directory.Application.File.User`;
	static modifySearch: string = `Permissions.File`;
	static modifyPermissionsSubSearch: string = `File.Directory`;
	static modifyFileSubSearch: string = `Name.Contents.Date`;
	static viewSearch: string = `Directory.Logfile.File.Processes`;
	static locateSearch: string = `File.Process.Self.Users`;
	static copySearch: string = `SCP`;

}