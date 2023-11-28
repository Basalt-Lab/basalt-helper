//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_IBUILDSTRATEGY_HPP
#define FILECHUNKER_IBUILDSTRATEGY_HPP

#include <list>

#include "Chunk.hpp"

class IBuildStrategy {
public:
    virtual ~IBuildStrategy() = default;
    virtual int build(std::list<Chunk> &chunks) = 0;
};

#endif //FILECHUNKER_IBUILDSTRATEGY_HPP
