//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_CHUNK_HPP
#define FILECHUNKER_CHUNK_HPP

#include <vector>

struct Chunk {
    unsigned int size;
    std::vector<std::byte> data;
};

#endif //FILECHUNKER_CHUNK_HPP
