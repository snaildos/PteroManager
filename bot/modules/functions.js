const moment = require('moment');
const fs = require("fs");

module.exports = (client) => {
    
    
    client.paginator = (items, currentPage = 1, dataPerPage = 15) => {
      offset = (currentPage - 1) * dataPerPage,
      paginatedItems = items.slice(offset).slice(0, dataPerPage),
      totalPages = Math.ceil(items.length / dataPerPage);
      return {
          currentPage: currentPage,
          prePage: currentPage - 1 ? currentPage - 1 : null,
          nextPage: (totalPages > currentPage) ? currentPage + 1 : null,
          totalPages: totalPages,
          totalData: items.length,
          dataPerPage: dataPerPage,
          data: paginatedItems
      };
    }
    
    client.wait = (ms) => {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
        return;
    }

    client.log = (title, msg) => {
        let time = moment().format(global.config.get("timeFormat"));
        if (!title) title = 'Log';
        console.log(`${time} [${title}] ${msg}`);
    };

    client.checkPerms = (message) => {
        return (message.member.hasPermission('ADMINISTRATOR') || client.isOwner(message));
    }

    client.isOwner = (message) => {
        return (global.config.get("owners", []).includes(message.author.id));
    }

    client.capitalize = (string) => {
        if (!string) return new Error("Missing string");
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

    client.generatePassword = (length = 10) => {
        let n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let password = "";
        while (password.length < length) {
            password += n[Math.floor(Math.random() * n.length)];
        }
        return password;
    }

}
