module.exports = {
    getComment: function(req, res) {
        res.json([{
            userName: '甜酱',
            userType: '新人',
            time: '现在',
            content: '不好看，改动太大'
        }, {
            userName: '看透者',
            userType: '资深',
            time: '2h 之前',
            content: '故事一般，特效凑合，排片量太大了，ume23:59居然排了8场，加上0点的，2点的午夜场一共11场，太惊人了，营销做得不错，前无古人啊，故事没有太多惊喜！'
        }, {
            userName: '所谓的所谓',
            userType: '资深',
            time: '5h 之前',
            content: '圈钱之作，坑人之作'
        }])
    }
};
