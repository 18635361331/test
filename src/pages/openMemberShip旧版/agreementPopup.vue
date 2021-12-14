<template>
	<view class="page">
		<uni-popup ref="popup" type="bottom">
			<view class="collectTitle">
				<view class="goBackBtn" @click="closePopup"></view>
				<view class="title">
					文器库商城{{enterprise?"企业":"VIP"}}会员服务协议
				</view>
			</view>
			<!-- 企业会员 -->
			<view v-if="enterprise">
				<scroll-view scroll-y="true" class="agreementPopupContent">
					<view class="agreementEvery">
						本协议与您紧密相关，请下拉认真阅读，充分理解后再同意。
					</view>
					<view class="agreementEvery">
						文器商平台服务协议
					</view>
					<view class="agreementEvery">
						提示条款
					</view>
					<view class="agreementEvery">
						欢迎您注册并使用文器—平台（以下简称“本平台”）提供的服务。本平台由文器库（宁波）品牌管理有限公司及其关联公司运营并享有完全的所有权及知识产权等权益。为了保障您的权益，请您在注册、使用本平台前详细阅读并充分理解本协议所有内容，特别是加粗部分。当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，且您自愿受本协议的条款之约束，成为本平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。
					</view>
					<view class="agreementEvery">
						本协议内容包括协议正文、本协议下述条款明确援引的其他协议以及本平台已经或将来可能发布的各类规则、规范、解读、公告、通知、实施细则、介绍说明、FAQ等（以下简称“规则”）。所有规则为本协议不可分割的⼀部分，与本协议正文具有同等法律效力。根据国家法律法规变化及本平台运营需要，本平台有权对本协议条款及相关规则不时地进行修改，修改后的内容一旦以任何形式公布在本网站上即生效，并取代此前相关内容，您应不时关注本平台公告、提示信息及协议、规则等相关内容的变动。您知悉并确认，如您不同意更新后的内容，应立即停止使用本平台；如您继续使用本平台，即视为知悉变动内容并同意接受。
					</view>
					<view class="agreementEvery">
						第一条定义
					</view>
					<view class="agreementEvery">
						1. 文器商：通过您引导，在文器—平台购买商品或服务用于企业会员礼品采购。
					</view>
					<view class="agreementEvery">
						2. 文器商平台：指文器商小程序及其他应用程序。为了指代方便，除另有说明外，本协议中提及“文器商平台”时均可指向小程序。
					</view>
					<view class="agreementEvery">
						3. 推广者：指注册/登录并使用本平台，同意受本协议约束，具备完全的民事权利能力及民事行为能力的企业用户，即本协议项下的您。
					</view>
					<view class="agreementEvery">
						4. 服务权益：指企业会员根据本协议约定的计算方式应得的权益。
					</view>
					<view class="agreementEvery">
						5. 有效订单：指订单状态为交易成功并且平台审核通过，售后状态为文器商平台规定的退货期限内未发起售后，或者发起部分售后并且售后完成、售后关闭或者售后撤销的订单，排除尚在交易中的订单、发生退货退款的订单以及因各类原因导致交易失败的订单。
					</view>
					<view class="agreementEvery">
						第二条 平台账号
					</view>
					<view class="agreementEvery">
						1. 您应当使用本平台认可的账号登录本平台，并保证在注册账号时提供的注册资料是真实、准确且合法的。
					</view>
					<view class="agreementEvery">
						2. 针对您在本平台中使用的登录账号，根据相关法律、法规规定以及平台服务的特殊性和重要性，您同意：
					</view>
					<view class="agreementEvery">
						1）提交个人手机号进行实名认证；提交营业执照进行认证；
					</view>
					<view class="agreementEvery">
						2）提供真实、准确的手机号、微信账号等联系信息与登录账号进行关联，并在前述联系方式有变动时及时进行更新。
					</view>
					<view class="agreementEvery">
						第三条 服务模式
					</view>
					<view class="agreementEvery">
						1. 本平台接受品牌方或经销商的委托，为其在文器—平台上的商品或服务销售业务提供营销推广服务，为文器商平台潜在消费者为其提供商品介绍和推荐服务；撮合您与品牌方或经销商建立推广服务关系并促成消费者的购买，代为管理推广者并支付服务费。
					</view>
					<view class="agreementEvery">
						2. 您登录或注册本平台账号，根据本平台操作指引，为文器商服务销售业务提供营销推广服务，引导企业会员，企业员工会员至文器商平台进行购物消费。本平台根据您提供的推广服务，向您支付服务费。
					</view>
					<view class="agreementEvery">
						3. 本平台有权对您是否为合格企业会员进行评估或考核，评估或考核的维度包括但不限于您对文器商平台及其品牌、产品或服务的认知、了解和认可程度，
					</view>
					<view class="agreementEvery">
						第四条 本平台权利和义务
					</view>
					<view class="agreementEvery">
						1. 本平台保证本平台及其关联公司是本平台的合法经营者；
					</view>
					<view class="agreementEvery">
						2. 本平台保证其提供的数据的真实性和公正性；
					</view>
					<view class="agreementEvery">
						3. 如本平台出现下述任一情形，您有权要求提前终止本协议而无需承担违约责任（但您须提前15日书面通知本平台）：
					</view>
					<view class="agreementEvery">
						1）本平台的任何财物被法庭查封、扣押、冻结或强制执行，导致您无法根据本协议的约定收取服务费的；
					</view>
					<view class="agreementEvery">
						2）本平台申请解散、破产或清算（因重组或合并等正常的组织架构调整原因进行清算者例外）。
					</view>
					<view class="agreementEvery">
						4. 您授权本平台与文器商平台确认费用结算规则，包括但不限于费用计算方式、支付方式、支付时间等，并授权本平台为文器商平台向您支付费用使用或向文器商平台您提供的个人信息和支付信息。
					</view>
					<view class="agreementEvery">
						5. 本平台有权根据本平台业务实际经营情况等调整或终止平台的运营，届时本平台将提供相应的过渡或退出方案并在平台上进行公示，平台的具体运营调整时间或终止运营时间以该过渡或退出方案载明时间为准。
					</view>
					<view class="agreementEvery">
						6. 为使您能够及时、全面了解本平台和文器商平台相关的各类商品、服务及活动，您了解并同意，本平台可以通过您在注册、使用本平台过程中提供的联系方式多次、长期向您发送各类商品广告信息、促销优惠等商业性信息而无需另行获得您的同意。
					</view>
					<view class="agreementEvery">
						7. 本平台保留在法律法规允许的范围内自行决定接受或拒绝您的资格申请、取消资格、调整服务内容、终止提供服务等相关权利。
					</view>
					<view class="agreementEvery">
						第六条 您的权利和义务
					</view>
					<view class="agreementEvery">
						1. 您承诺并保证其具备履行本协议项下服务所需的能力。为了服务的顺利、平稳进行，您应尽最大努力保证服务方式的灵活性。
					</view>
					<view class="agreementEvery">
						2. 您确认其通过本平台所绑定的第三方支付账号为本协议项下的指定收款账号，您保证该账号为您自身所持有并已通过实名认证，且该实名认证信息与您平台账号的实名认证信息完全一致，否则因此产生的一切责任均由您自行承担。
					</view>
					<view class="agreementEvery">
						3. 如您出现违反本协议的任一情形，本平台有权停止确认您服务权益（不论该服务费是否已经实际发生），冻结或终止您的平台账号，及/或要求提前终止本协议而无须承担违约责任。
					</view>
					<view class="agreementEvery">
						4. 您保证其为推广、宣传文器—-平台产品而采取的推广、宣传方式或发布的信息内容符合有关法律法规的规定，并不侵犯本平台或任何第三方的合法权益。您保证向消费者客观地描述文器商平台及文器商平台上的相关品牌、产品或服务等，遵循消费者者自愿购买原则，不使用强制说服、威胁、利诱等方式提供服务，不作夸大、虚假宣传。如因您推广、宣传方式及/或发布的信息内容违反相关法律法规规定，或侵犯本平台或任何第三方的合法权益而产生的任何争议、纠纷、诉讼、仲裁、处罚、赔偿等，均由您自行负责处理并承担所有相关法律责任，与本平台无涉。
					</view>
					<view class="agreementEvery">
						5. 您承诺，在履行本协议过程中，以扩大宣传、推广文器商平台及其形象、产品和服务为本协议的根本目的，并保证在履行本协议项下约定时遵循诚实信用原则，不损害文器商平台、本平台及本平台关联公司的任何利益。
					</view>
					<view class="agreementEvery">
						第七条 知识产权及保密
					</view>
					<view class="agreementEvery">
						1. 本平台及文器商平台上的所有内容，包括但不限于文字、软件、声音、图片、录像、图表、平台/网站架构、平台/网站画面的安排、平台/网页设计、在广告中的全部内容、商品以及其它信息均由其合法权利人享有知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。非经本平台书面同意，您不得擅自使用、修改、全部或部分复制、公开传播、改变、散布、发行或公开发表、转载、引用、链接、抓取或以其他方式使用本平台程序或内容。若您违反本条约定给本平台、文器商平台或本平台关联公司造成损失的，您应当予以赔偿。
					</view>
					<view class="agreementEvery">
						2. 您在本协议的履行过程中获知的本平台及文器商平台的保密信息，包括但不限于经营计划、经营方式、客户清单、市场机会、会计或财务记录等与本平台业务有关的任何信息，在未经本平台事先书面同意的情况下，不得向任何第三方披露，并不得为履行本协议义务以外的其他任何目的使用保密信息，否则应承担本平台及本平台关联公司因此而受到的损失。
					</view>
					<view class="agreementEvery">
						第八条 不可抗力
					</view>
					<view class="agreementEvery">
						本平台依照法律规定履行基础保障义务，但对于下述原因导致的本协议履行障碍、履行瑕疵、履行延后或履行内容变更等情形，本平台不承担相应的违约责任：
					</view>
					<view class="agreementEvery">
						（1）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；
					</view>
					<view class="agreementEvery">
						（2）因电力供应故障、通讯网络故障等公共服务因素或第三人因素；
					</view>
					<view class="agreementEvery">
						（3）在本平台已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素。
					</view>
					<view class="agreementEvery">
						第九条 违约责任
					</view>
					<view class="agreementEvery">
						1. 如果非因不可抗力因素，您违反本协议规定的，在接到本平台书面或邮件通知后您应于1个工作日内纠正，如仍未达到本平台要求，本平台有权视违约情节轻重，单方提出解除本协议，终止您的账号，并有权向您追回已支付的全部服务费，且您必须赔偿由此给本平台及本平台关联公司造成的全部损失。
					</view>
					<view class="agreementEvery">
						2. 您和本平台双方均有过错的，应根据双方实际过错程度，分别承担各自的违约责任。但是无论如何，本平台在本协议项下的累计总赔偿责任不应超过您已获得的服务费总额。
					</view>
					<view class="agreementEvery">
						3. 除非本协议另有明确约定，如您违反本协议载明的陈述及保证，则本平台有权要求您按照其违约期间所获得的全部收益的两倍向本平台支付违约金。
					</view>
					<view class="agreementEvery">
						4. 您承诺其向本平台提交的任何资料，包括但不限于其注册信息、第三方支付账号信息、实名认证信息、联系方式等内容的真实性，否则本平台有权立即暂停或终止其账号、不予支付服务费并终止与您的合作，并有权追回已支付的全部服务费。此外，本平台有权要求您赔偿本平台及本平台关联公司因此造成的损失。
					</view>
					<view class="agreementEvery">
						第十条 适用法律与争议解决
					</view>
					<view class="agreementEvery">
						1. 本协议之订立、生效、解释、修订、补充、终止、执行与争议解决，均适用中华⼈⺠共和国大陆地区法律。
					</view>
					<view class="agreementEvery">
						2. 因本协议内容或其执行所产生的或与之有关的任何争议，由本平台与您协商解决。若协商不成，任何一方均可将争议提交杭州仲裁委员会根据其现行有效的仲裁规则进⾏仲裁。
					</view>
					<view class="agreementEvery">
						第十一条 其他
					</view>
					<view class="agreementEvery">
						1. 本平台与您在此声明：双方不会因根据本协议产生的合作，构成任何形式的劳动或雇佣关系。本平台除向您支付本协议约定的服务费外，不承担您的任何其他费用，包括但不限于社会保险、福利和医疗保险费用等。
					</view>
					<view class="agreementEvery">
						2. 本协议不包含任何可能理解为双方之间设立一种代理或合伙关系的内容。您无权代表本平台对外缔结协议。您不得以本平台的名义开展任何与约定的推广无关的活动或者从事违法犯罪活动，否则一切后果由您自行承担，同时本平台保留追究相关法律责任的权利。
					</view>
					<view class="agreementEvery">
						3. 本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
					</view>
					<view class="agreementEvery">
						最近更新：2021年4月1日					
					</view>
				</scroll-view>
			</view>
			<!-- 个人会员 -->
			<view v-else>
				<scroll-view scroll-y="true" class="agreementPopupContent">
					<view class="agreementEvery">
						文器库商城平台个人会员协议
					</view>
					<view class="agreementEvery">
						一、总则
					</view>
					<view class="agreementEvery">
						1.1 文器库商城的所有权和运营权归文器库（宁波）品牌管理有限公司所有。
					</view>
					<view class="agreementEvery">
						1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与文器库商城之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。  
					</view>
					<view class="agreementEvery">
						1.3 本协议则可由文器库商城随时更新，用户应当及时关注并同意，本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。
					</view>
					<view class="agreementEvery">
						二、服务内容
					</view>
					<view class="agreementEvery">
						2.1 文器库商城的具体内容由本站根据实际情况提供。
					</view>
					<view class="agreementEvery">
						2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。
					</view>
					<view class="agreementEvery">
						三、用户帐号
					</view>
					<view class="agreementEvery">
						3.1 用户角色：
					</view>
					<view class="agreementEvery">
						普通用户： 经本站注册系统完成注册程序的用户即成为普通用户，可以获得本站规定普通用户所应享有的一切权限；未经认证仅享有本站规定的部分权限；
					</view>
					<view class="agreementEvery">
						会员用户： 用户充值199元即可成为会员用户，可以获得本站规定会员用户所应享有的一切权限；
					</view>
					<view class="agreementEvery">
						3.2 用户只能按照注册要求来进行注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。
					</view>
					<view class="agreementEvery">
						3.3 用户角色权益：
					</view>
					<view class="agreementEvery">
						普通用户： 用户可以浏览商城产品，并依照零售价购买；
					</view>
					<view class="agreementEvery">
						会员用户： 用户充值199元即可成为会员用户；
					</view>
					<view class="agreementEvery">
						1、会员礼包，会员可在礼包区域免费兑换一款自己喜欢的商品；
					</view>
					<view class="agreementEvery">
						2、邀新奖励，邀请一个新会员可以获得68元奖励，在个人中心查看，可用于购买商品；
					</view>
					<view class="agreementEvery">
						3、赠送库豆，赠送1000库豆，1库豆=1元，库豆可在平台用来抵扣商品价格；
					</view>
					<view class="agreementEvery">
						4、自购省钱，会员自己在平台购买商品可享会员价；
					</view>
					<view class="agreementEvery">
						5、分享赚钱，分享平台商品给其他人购买并最终订单完成时可享返现；
					</view>
					<view class="agreementEvery">
						6、复购奖励，自己邀请的会员在平台复购时，该会员购买商品价格的x%作为奖励；  
					</view>
					<view class="agreementEvery">
						7、会员日，每月8日会员日，会员专属优质商品、大额折扣；
					</view>
					<view class="agreementEvery">
						8、无忧售后，7*24h专属客服； 
					</view>
					<view class="agreementEvery">
						9、极速发货，24h之内发货；
					</view>
					<view class="agreementEvery">
						四、使用规则
					</view>
					<view class="agreementEvery">
						4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。  
					</view>
					<view class="agreementEvery">
						4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：
					</view>
					<view class="agreementEvery">
						(1)违反宪法确定的基本原则的；
					</view>
					<view class="agreementEvery">
						(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；  
					</view>
					<view class="agreementEvery">
						(3)损害国家荣誉和利益的； 
					</view>
					<view class="agreementEvery">
						(4)煽动民族仇恨、民族歧视，破坏民族团结的；  
					</view>
					<view class="agreementEvery">
						(5)破坏国家宗教政策，宣扬邪教和封建迷信的；  
					</view>
					<view class="agreementEvery">
						(6)散布谣言，扰乱社会秩序，破坏社会稳定的；
					</view>
					<view class="agreementEvery">
						(6)散布谣言，扰乱社会秩序，破坏社会稳定的；
					</view>
					<view class="agreementEvery">
						(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；  
					</view>
					<view class="agreementEvery">
						(8)侮辱或者诽谤他人，侵害他人合法权益的；  
					</view>
					<view class="agreementEvery">
						(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；  
					</view>
					<view class="agreementEvery">
						(10)以非法民间组织名义活动的；
					</view>
					<view class="agreementEvery">
						(11)含有法律、行政法规禁止的其他内容的。
					</view>
					<view class="agreementEvery">
						五、隐私保护
					</view>
					<view class="agreementEvery">
						5.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：
					</view>
					<view class="agreementEvery">
						(1)事先获得用户的明确授权；
					</view>
					<view class="agreementEvery">
						(2)根据有关的法律法规要求；
					</view>
					<view class="agreementEvery">
						(3)按照相关政府主管部门的要求；
					</view>
					<view class="agreementEvery">
						(4)为维护社会公众的利益。
					</view>
					<view class="agreementEvery">
						5.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。
					</view>
					<view class="agreementEvery">
						5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
					</view>
					<view class="agreementEvery">
						六、版权声明
					</view>
					<view class="agreementEvery">
						6.1 本协议解释权及修订权归文器库（宁波）品牌管理有限公司所有。  
					</view>
					<view class="agreementEvery">
						6.2 本站特有的标识、版面设计、编排方式等版权均属文器库（宁波）品牌管理有限公司享有，未经本站许可，不得任意复制或转载。  
					</view>
					<view class="agreementEvery">
						七、责任声明
					</view>
					<view class="agreementEvery">
					 	7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，文器库商城对此不承担任何责任。  
					</view>
					<view class="agreementEvery">
					 	7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，文器库商城对此不承担任何责任。  
					</view>
					<view class="agreementEvery">
					 	7.2 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，文器库商城对此不承担任何责任。  
					</view>
					<view class="agreementEvery">
					 	7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。
					</view>
					<view class="agreementEvery">
					 	7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
					</view>
					<view class="agreementEvery">
					 	7.5 对于本站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：
					</view>
					<view class="agreementEvery">
					 	7.5 对于本站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：
					</view>
					<view class="agreementEvery">
					 	(1)本站向用户免费提供的各项网络服务；  
					</view>
					<view class="agreementEvery">
					 	(2)本站向用户赠送的任何产品或者服务。
					</view>
					<view class="agreementEvery">
					 	7.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。
					</view>
					<view class="agreementEvery">
					 	八、附则
					</view>
					<view class="agreementEvery">
					 	8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。  
					</view>
					<view class="agreementEvery">
					 	8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
					</view>
					<view class="agreementEvery">
						8.3 本协议解释权及修订权归文器库（宁波）品牌管理有限公司所有。
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props:["enterprise"],
		data(){
			return{
				
			}
		},
		methods:{
			openPopup(){	//打开服务协议
				this.$refs.popup.open();
			},
			closePopup(){	//关闭会员服务协议
				this.$refs.popup.close()
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.commonPageTitle {
		background-color: #F5F5F5;
		padding-top: 88rpx;
	}
	.collectTitle .goBackBtn {
	    background-size: 40rpx 40rpx;
	    position: absolute;
	    right: 0;
	    top: 0;
	    background-image: url(http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/group_2@2x.png);
	  }
 
	 
	.agreementPopupContent{
		height:100vh;
		background-color: #FFFFFF;
		padding-top: 100rpx;
	}
	.agreementEvery{
		padding: 0 30rpx;
		color: #999999;
		margin-top: 20rpx;
		font-size: 26rpx;
	}
</style>
