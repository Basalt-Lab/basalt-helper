#include "FileChunker.hpp"

#include <iostream>
int main(int ac, char **av) {
    try {
        FileChunker fileChunker;
    } catch (std::exception &e) {
        std::cerr << e.what() << std::endl;
        return -1;
    }
    return 0;
}
