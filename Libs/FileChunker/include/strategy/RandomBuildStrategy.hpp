//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_RANDOMBUILDSTRATEGY_HPP
#define FILECHUNKER_RANDOMBUILDSTRATEGY_HPP

#include "IBuildStrategy.hpp"

class RandomBuildStrategy: public IBuildStrategy {
public:
    int build(std::list<Chunk> &chunks) override;
};

#endif //FILECHUNKER_RANDOMBUILDSTRATEGY_HPP
