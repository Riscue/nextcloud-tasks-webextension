const OFF = 0, WARN = 1, ERROR = 2,
    NEVER = 'never', ALWAYS = 'always';

module.exports = exports = {
    'env': {
        'es6': true,
        'browser': true,
        'webextensions': true
    },

    'parserOptions': {
        'parser': 'babel-eslint'
    },

    'extends': [
        'plugin:vue/recommended',
        'eslint:recommended'
    ],

    'rules': {
        'generator-star-spacing': [ERROR, 'before'],
        'no-alert': process.env.NODE_ENV === 'production' ? ERROR : OFF,
        'no-console': process.env.NODE_ENV === 'production' ? ERROR : OFF,
        'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
        'indent': [WARN, 4, {
            'SwitchCase': 1
        }],
        'padded-blocks': [WARN, {
            'blocks': NEVER,
            'classes': ALWAYS,
            'switches': NEVER
        }],
        'semi': [ERROR, ALWAYS],
        'vue/max-attributes-per-line': OFF,
        'vue/singleline-html-element-content-newline': OFF,
        'vue/html-indent': [WARN, 4],
        'vue/script-indent': [WARN, 4, {
            'baseIndent': 0,
            'switchCase': 1,
            'ignores': []
        }],
        'quotes': [WARN, 'single'],
        'object-curly-spacing': [WARN, NEVER],
        'space-before-function-paren': [WARN, ALWAYS],

        'no-extra-parens': ERROR,
        'no-unexpected-multiline': ERROR,

        'accessor-pairs': [ERROR, {
            'getWithoutSet': false,
            'setWithoutGet': true
        }],
        'block-scoped-var': WARN,
        'consistent-return': ERROR,
        'curly': ERROR,
        'default-case': WARN,
        'dot-location': [WARN, 'property'],
        'dot-notation': WARN,
        'eqeqeq': [ERROR, 'smart'],
        'guard-for-in': WARN,
        'no-caller': ERROR,
        'no-case-declarations': WARN,
        'no-div-regex': WARN,
        'no-else-return': WARN,
        'no-labels': WARN,
        'no-empty-pattern': WARN,
        'no-eq-null': WARN,
        'no-eval': ERROR,
        'no-extend-native': ERROR,
        'no-extra-bind': WARN,
        'no-floating-decimal': WARN,
        'no-implicit-coercion': [WARN, {
            'boolean': true,
            'number': true,
            'string': true
        }],
        'no-implied-eval': ERROR,
        'no-invalid-this': ERROR,
        'no-iterator': ERROR,
        'no-lone-blocks': WARN,
        'no-loop-func': ERROR,
        'no-magic-numbers': WARN,
        'no-multi-spaces': ERROR,
        'no-multi-str': WARN,
        'no-native-reassign': ERROR,
        'no-new-func': ERROR,
        'no-new-wrappers': ERROR,
        'no-new': ERROR,
        'no-octal-escape': ERROR,
        'no-param-reassign': ERROR,
        'no-process-env': WARN,
        'no-proto': ERROR,
        'no-redeclare': ERROR,
        'no-return-assign': ERROR,
        'no-script-url': ERROR,
        'no-self-compare': ERROR,
        'no-throw-literal': ERROR,
        'no-unused-expressions': ERROR,
        'no-useless-call': ERROR,
        'no-useless-concat': ERROR,
        'no-void': WARN,
        'no-warning-comments': [WARN, {
            'terms': ['TODO', 'FIXME'],
            'location': 'start'
        }],
        'no-with': WARN,
        'radix': WARN,
        'vars-on-top': ERROR,
        'wrap-iife': [ERROR, 'outside'],
        'yoda': ERROR,

        'strict': [ERROR, NEVER],

        'init-declarations': [ERROR, ALWAYS],
        'no-catch-shadow': WARN,
        'no-delete-var': ERROR,
        'no-label-var': ERROR,
        'no-shadow-restricted-names': ERROR,
        'no-shadow': WARN,
        'no-undef-init': OFF,
        'no-undef': ERROR,
        'no-undefined': OFF,
        'no-unused-vars': WARN,
        'no-use-before-define': ERROR,

        'callback-return': [WARN, ['callback', 'next']],
        'global-require': ERROR,
        'handle-callback-err': WARN,
        'no-mixed-requires': WARN,
        'no-new-require': ERROR,
        'no-path-concat': ERROR,
        'no-process-exit': ERROR,
        'no-restricted-modules': OFF,
        'no-sync': WARN,

        'arrow-body-style': OFF,
        'arrow-parens': [ERROR, ALWAYS],
        'arrow-spacing': [ERROR, {
            'before': true,
            'after': true
        }],
        'constructor-super': ERROR,
        'no-confusing-arrow': ERROR,
        'no-constant-condition': ERROR,
        'no-class-assign': ERROR,
        'no-const-assign': ERROR,
        'no-dupe-class-members': ERROR,
        'no-this-before-super': ERROR,
        'no-var': WARN,
        'object-shorthand': [WARN, NEVER],
        'prefer-arrow-callback': WARN,
        'prefer-spread': WARN,
        'prefer-template': WARN,
        'require-yield': ERROR,

        'array-bracket-spacing': [WARN, NEVER],
        'block-spacing': [WARN, ALWAYS],
        'brace-style': [WARN, '1tbs', {'allowSingleLine': false}],
        'camelcase': WARN,
        'comma-spacing': [WARN, {
            'before': false,
            'after': true
        }],
        'comma-style': [WARN, 'last'],
        'computed-property-spacing': [WARN, NEVER],
        'consistent-this': [WARN, 'self'],
        'eol-last': [WARN, ALWAYS],
        'func-names': OFF,
        'func-style': [WARN, 'declaration'],
        'id-length': [WARN, {
            'min': 2,
            'max': 32
        }],
        'jsx-quotes': [WARN, 'prefer-double'],
        'linebreak-style': [WARN, 'unix'],
        'lines-around-comment': [WARN, {'beforeBlockComment': true}],
        'max-depth': [WARN, 8],
        'max-len': [WARN, 132],
        'max-nested-callbacks': [WARN, 8],
        'max-params': [WARN, 8],
        'new-cap': WARN,
        'new-parens': WARN,
        'no-array-constructor': WARN,
        'no-bitwise': OFF,
        'no-continue': OFF,
        'no-inline-comments': OFF,
        'no-lonely-if': WARN,
        'no-mixed-spaces-and-tabs': WARN,
        'no-multiple-empty-lines': WARN,
        'no-negated-condition': OFF,
        'no-nested-ternary': WARN,
        'no-new-object': WARN,
        'no-plusplus': OFF,
        'no-spaced-func': WARN,
        'no-ternary': OFF,
        'no-trailing-spaces': WARN,
        'no-underscore-dangle': WARN,
        'no-unneeded-ternary': WARN,
        'one-var': OFF,
        'operator-assignment': [WARN, NEVER],
        'operator-linebreak': [WARN, 'after'],
        'quote-props': [WARN, 'consistent-as-needed'],
        'semi-spacing': [WARN, {
            'before': false,
            'after': true
        }],
        'sort-vars': OFF,
        // 'space-after-keywords': [WARN, ALWAYS],
        'space-before-blocks': [WARN, ALWAYS],
        // 'space-before-keywords': [WARN, ALWAYS],
        'space-in-parens': [WARN, NEVER],
        'space-infix-ops': [WARN, {'int32Hint': true}],
        'keyword-spacing': ERROR,
        'space-unary-ops': ERROR,
        'spaced-comment': [WARN, ALWAYS],
        'wrap-regex': WARN
    },

    'plugins': [
        'vue'
    ]
};
