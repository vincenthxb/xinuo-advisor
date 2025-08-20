
import type { Question } from './types';

export interface Translations {
    en: {
        headerTitle: string;
        headerSubtitle: string;
        question: string;
        back: string;
        next: string;
        loadingTitle: string;
        loadingSubtitle: string;
        errorTitle: string;
        tryAgain: string;
        recommendationTitle: string;
        startOver: string;
        usage: string;
        shareJourneyTitle: string;
        aiSearch: string;
        searchPlaceholder: string;
        searchButton: string;
        noResults: string;
        questions: Question[];
        productContext: string;
    };
    zh: {
        headerTitle: string;
        headerSubtitle: string;
        question: string;
        back: string;
        next: string;
        loadingTitle: string;
        loadingSubtitle: string;
        errorTitle: string;
        tryAgain: string;
        recommendationTitle: string;
        startOver: string;
        usage: string;
        shareJourneyTitle: string;
        aiSearch: string;
        searchPlaceholder: string;
        searchButton: string;
        noResults: string;
        questions: Question[];
        productContext: string;
    };
}

export const translations: Translations = {
    en: {
        headerTitle: "AI Health Advisor",
        headerSubtitle: "Discover your personalized wellness path, powered by nature and technology.",
        question: "Question",
        back: "Back",
        next: "Next",
        loadingTitle: "Consulting our AI Advisor...",
        loadingSubtitle: "Crafting your personalized wellness plan.",
        errorTitle: "An Error Occurred",
        tryAgain: "Try Again",
        recommendationTitle: "Your Personalized Wellness Plan",
        startOver: "Start Over",
        usage: "Usage",
        shareJourneyTitle: "Share Your Wellness Journey ✨",
        aiSearch: "AI Search Saved Posts",
        searchPlaceholder: "Describe the post you're looking for...",
        searchButton: "Search",
        noResults: "No matching post found.",
        questions: [
            {
                id: 'mainGoal',
                text: 'What is your primary wellness goal today?',
                options: [
                    'Boost Energy & Fight Fatigue',
                    'Enhance Cognitive Function & Anti-Aging',
                    'Support Liver Health & Detox',
                    'Improve Gut Health & Digestion',
                    'Manage Blood Sugar & Weight',
                    'Strengthen Immune System'
                ]
            },
            {
                id: 'preference',
                text: 'How do you prefer to take your supplements?',
                options: [
                    'A convenient daily capsule or tablet',
                    'A powder to mix into drinks',
                    'A ready-to-drink tea or beverage',
                    'Something quick, like a lozenge or melt'
                ]
            },
            {
                id: 'lifestyle',
                text: 'Which lifestyle factor is most relevant to you?',
                options: [
                    'High-stress work or study environment',
                    'Regular social events with alcohol',
                    'Active lifestyle with regular exercise',
                    'Concerned with the effects of aging',
                    'Looking for natural beauty solutions'
                ]
            }
        ],
        productContext: `
        You are advising on products from the '美甘莓露' & '畅晟' series. Here is the product list:

        1.  **DMY 益生元粉 (DMY Probiotic Powder)**: 
            -   **Function**: High-efficiency liver protection and alcohol metabolism support.
            -   **Mechanism**: Triple action: 1) Forms a protective film in the stomach to slow alcohol absorption. 2) DHM nanoparticles activate liver detoxification enzymes. 3) Probiotics regulate gut flora to aid metabolism.
            -   **Best for**: People who drink alcohol socially, liver health support.

        2.  **畅晟蛋白粉/纤维粉 (Changsheng Protein/Fiber Powder)**:
            -   **Function**: Weight and blood sugar management.
            -   **Mechanism**: Controls sugar metabolism, optimizes energy use through ketosis, enhances insulin sensitivity, and mimics metformin effects through mycelium delivery of active ingredients.
            -   **Best for**: Fitness enthusiasts, weight management, blood sugar control.

        3.  **益生元活菌粉 (Probiotic Live Bacteria Powder)**:
            -   **Function**: Gut health and immune system regulation.
            -   **Mechanism**: Promotes growth of beneficial gut bacteria, repairs intestinal barrier with DHM nanomicelles.
            -   **Best for**: Digestive issues, overall gut health, strengthening immunity.

        4.  **NMN 片/胶囊 (NMN Tablets/Capsules)**:
            -   **Function**: Advanced anti-aging, especially for cognitive health.
            -   **Mechanism**: Five-dimensional synergistic formula to improve brain energy metabolism, target cellular aging pathways, and cross the blood-brain barrier.
            -   **Best for**: Anti-aging, cognitive function, memory support.

        5.  **回元片 (Hui Yuan Tablets)**:
            -   **Function**: Blood sugar control and anti-fatigue.
            -   **Mechanism**: Uses flavonoids and beta-glucan micro-encapsulation to control sugar absorption and fight fatigue.
            -   **Best for**: Managing post-meal sugar spikes, sustained energy.

        6.  **DMY-皂苷类纳米颗粒 (DMY-Saponin Nanoparticles) based products**:
            -   **Function**: Immune enhancement, anti-fatigue, and anti-aging.
            -   **Mechanism**: Combines DHM with saponins from herbs like Ginseng and Astragalus for powerful antioxidant and immune-modulating effects.
            -   **Best for**: Strengthening the immune system, recovering from fatigue, general anti-aging.

        7.  **新中式茶饮 (New-style Chinese Tea Drinks)**:
            -   **Function**: General wellness, relaxation, and targeted seasonal support.
            -   **Examples**: Stars Tea (for sleep), Flower Berry Tea (rich in anthocyanins), Green Plum Drink (detox).
            -   **Best for**: Daily wellness, relaxation, mild support for various needs.
        `
    },
    zh: {
        headerTitle: "AI健康顾问",
        headerSubtitle: "融合自然与科技，发现您的个性化健康之路。",
        question: "问题",
        back: "返回",
        next: "继续",
        loadingTitle: "正在咨询AI健康顾问...",
        loadingSubtitle: "为您量身定制专属健康方案。",
        errorTitle: "发生错误",
        tryAgain: "重试",
        recommendationTitle: "您的个性化健康方案",
        startOver: "重新开始",
        usage: "使用建议",
        shareJourneyTitle: "分享您的健康之旅 ✨",
        aiSearch: "AI搜索已保存内容",
        searchPlaceholder: "描述您想查找的文案...",
        searchButton: "搜索",
        noResults: "未找到匹配的文案。",
        questions: [
            {
                id: 'mainGoal',
                text: '您今天最主要的健康目标是什么？',
                options: [
                    '提升精力 & 对抗疲劳',
                    '增强认知功能 & 抗衰老',
                    '养护肝脏 & 促进排毒',
                    '改善肠道健康 & 消化',
                    '管理血糖 & 体重',
                    '增强免疫力'
                ]
            },
            {
                id: 'preference',
                text: '您偏好哪种产品形态？',
                options: [
                    '方便的每日胶囊或片剂',
                    '可加入饮品的冲泡粉末',
                    '即饮的茶饮或饮料',
                    '快速起效的含片或口溶片'
                ]
            },
            {
                id: 'lifestyle',
                text: '以下哪个生活方式因素与您最相关？',
                options: [
                    '高压力的工作或学习环境',
                    '经常参加有饮酒的社交活动',
                    '热爱运动，生活方式积极',
                    '关注衰老带来的影响',
                    '寻求天然的美容解决方案'
                ]
            }
        ],
        productContext: `
        您正在为'美甘莓露'和'畅晟'系列产品提供建议。这是产品列表：

        1.  **DMY 益生元粉**: 
            -   **功能**: 高效护肝，辅助酒精代谢。
            -   **机理**: 三重作用：1) 在胃部形成保护膜，减缓酒精吸收。2) DHM纳米颗粒激活肝脏解毒酶。3) 益生元调节肠道菌群，帮助代谢。
            -   **最适合**: 社交饮酒人士，肝脏健康支持。

        2.  **畅晟蛋白粉/纤维粉**:
            -   **功能**: 体重与血糖管理。
            -   **机理**: 控制糖代谢，通过生酮作用优化能量利用，增强胰岛素敏感性，并通过菌丝体递送活性成分模拟二甲双胍效果。
            -   **最适合**: 健身爱好者，体重管理，血糖控制。

        3.  **益生元活菌粉**:
            -   **功能**: 肠道健康与免疫系统调节。
            -   **机理**: 促进有益肠道细菌生长，利用DHM纳米胶束修复肠道屏障。
            -   **最适合**: 消化问题，整体肠道健康，增强免疫力。

        4.  **NMN 片/胶囊**:
            -   **功能**: 高级抗衰老，尤其针对认知健康。
            -   **机理**: 五维协同配方，改善大脑能量代谢，靶向细胞衰老通路，并能穿过血脑屏障。
            -   **最适合**: 抗衰老，认知功能，记忆力支持。

        5.  **回元片**:
            -   **功能**: 血糖控制与抗疲劳。
            -   **机理**: 利用黄酮类和β-葡聚糖微胶囊技术控制糖分吸收并对抗疲劳。
            -   **最适合**: 管理餐后血糖高峰，维持持久能量。

        6.  **DMY-皂苷类纳米颗粒产品**:
            -   **功能**: 增强免疫，抗疲劳，抗衰老。
            -   **机理**: 将DHM与人参、黄芪等草本中的皂苷结合，具有强大的抗氧化和免疫调节效果。
            -   **最适合**: 增强免疫系统，从疲劳中恢复，全面抗衰老。

        7.  **新中式茶饮**:
            -   **功能**: 日常健康，放松，以及季节性调理。
            -   **例如**: 星星茶（助眠），花莓茶（富含花青素），青莓饮（清热解毒）。
            -   **最适合**: 日常保健，放松身心，温和调理。
        `
    }
};