//
// Created by ruby on 28/11/2023.
//

#ifndef FILECHUNKER_ISPLITSTRATEGY_HPP
#define FILECHUNKER_ISPLITSTRATEGY_HPP

#include <string>

class ISplitStrategy {
public:
    virtual ~ISplitStrategy() = default;
    virtual int split(const std::string &path) = 0;
};

#endif //FILECHUNKER_ISPLITSTRATEGY_HPP
