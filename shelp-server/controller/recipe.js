const request = require('request');
const cheerio = require('cheerio');
const { items } = require('../models');

module.exports = {
    get: async (req, res) => {
        const url = 'https://www.10000recipe.com/recipe/list.html?q='
        const result = [];
        request(url, (error, response, body) => {
            if (error) {
                res.status(500).json({ message: "Internal server error" });
            };
            const $ = cheerio.load(body);
            const dataSet = [[],[],[],[]];
            try {
                $('ul.rcp_m_list2>ul>li>div.common_sp_caption>div.common_sp_caption_tit')
                    .each(function (index, elem) {
                        let text = $(this).text();
                        dataSet[0].push(text);
                    });
                $('ul.rcp_m_list2>ul>li>div.common_sp_thumb>a')
                    .each(function (index, el) {
                        dataSet[1].push(`https://www.10000recipe.com${el.attribs.href}`);
                    });
                $('ul.rcp_m_list2>ul>li>div.common_sp_thumb>a>img')
                    .each(function (index, el) {
                        dataSet[2].push(el.attribs.src);
                    });
                $('ul.rcp_m_list2>ul>li>div.common_sp_caption>div.common_sp_caption_rv>span.common_sp_caption_buyer')
                    .each(function (index, el) {
                        let text = $(this).text();
                        text = text.split(' ')[1];
                        dataSet[3].push(text);
                    });
                const array = [];
                if(dataSet[0].length > 16) {
                    while(array.length<16){
                        let num = Math.floor(Math.random() * dataSet[0].length);
                        if(!array.includes(num)){
                            array.push(num);
                        }
                    }
                } else {
                    for(let i=0; i<dataSet[0].length; i++){
                        array.push(i);
                    }
                }
                for (let i = 0; i<array.length; i++) {
                    result.push({
                        name: dataSet[0][array[i]],
                        url: dataSet[1][array[i]],
                        image: dataSet[2][array[i]],
                        hits: dataSet[3][array[i]]
                    })
                }
                res.status(200).json({data: result, message: 'ok'});
            } catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    },
    getById: async (req, res) => {
        const itemId = req.params.id;
        try {
            const itemInfo = await items.findOne({ where: { id: itemId } });
            if (!itemInfo) {
                res.status(400).json({ message: 'Invalid id' });
            } else {
                const url = encodeURI(`https://www.10000recipe.com/recipe/list.html?q=${itemInfo.name}`);
                const result = [];
                request(url, (error, response, body) => {
                    if (error) {
                        res.status(500).json({ message: "Internal server error" });
                    };
                    const $ = cheerio.load(body);
                    const dataSet = [[],[],[],[]];
                    try {
                        $('ul.rcp_m_list2>ul>li>div.common_sp_caption>div.common_sp_caption_tit')
                            .each(function (index, elem) {
                                let text = $(this).text();
                                dataSet[0].push(text);
                            });
                        $('ul.rcp_m_list2>ul>li>div.common_sp_thumb>a')
                            .each(function (index, el) {
                                dataSet[1].push(`https://www.10000recipe.com${el.attribs.href}`);
                            });
                        $('ul.rcp_m_list2>ul>li>div.common_sp_thumb>a>img')
                            .each(function (index, el) {
                                dataSet[2].push(el.attribs.src);
                            });
                        $('ul.rcp_m_list2>ul>li>div.common_sp_caption>div.common_sp_caption_rv>span.common_sp_caption_buyer')
                            .each(function (index, el) {
                                let text = $(this).text();
                                text = text.split(' ')[1];
                                dataSet[3].push(text);
                            });
                        const array = [];
                        if(dataSet[0].length > 16) {
                            while(array.length<16){
                                let num = Math.floor(Math.random() * dataSet[0].length);
                                if(!array.includes(num)){
                                    array.push(num);
                                }
                            }
                        } else {
                            for(let i=0; i<dataSet[0].length; i++){
                                array.push(i);
                            }
                        }
                        for (let i = 0; i<array.length; i++) {
                            result.push({
                                name: dataSet[0][array[i]],
                                url: dataSet[1][array[i]],
                                image: dataSet[2][array[i]],
                                hits: dataSet[3][array[i]]
                            })
                        }
                        res.status(200).json({data: result, message: 'ok'});
                    } catch (error) {
                        res.status(500).json({ message: "Internal server error" });
                    }
                });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });   
        }
    }
};