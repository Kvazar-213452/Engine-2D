#include "../include/httplib.h"
#include <iostream>
#include "../include/config.h"
#include "../include/html.h"
#include <filesystem>
#include <locale>
#include <codecvt>

std::string read_file(const std::string& filename) {
    std::ifstream file(filename);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open file " << filename << std::endl;
        return "";
    }

    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

void start_server() {
    httplib::Server svr;

    std::string html_content = read_file("../end/index.html");

    svr.Get("/", [&html_content](const httplib::Request& req, httplib::Response& res) {
        if (html_content.empty()) {
            res.status = 500;
            res.set_content("Error: Could not read index.html", "text/plain");
        } else {
            res.set_content(html_content, "text/html");
        }
    });

    svr.listen("127.0.0.1", port);
}