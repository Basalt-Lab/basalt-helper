//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_RANDOMSPLITSTRATEGY_HPP
#define FILECHUNKER_RANDOMSPLITSTRATEGY_HPP

#include "ISplitStrategy.hpp"

class RandomSplitStrategy : public ISplitStrategy {
public:
    int split(const std::string &path) override;
};

#endif //FILECHUNKER_RANDOMSPLITSTRATEGY_HPP
