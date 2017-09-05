(function () {

	function guid(p) {
		var t = p || 'msg-xxxxxxxxxxxx';
		return t.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	$.fn.extend({
		closeMsg: function (back, el) {
			var $this = el ? $(el) : $(this);
			$this.parent().removeClass('active').addClass('hold');
			setTimeout(function () {
				$this.parent().remove();
				if (back) back($this);
			}, 400);
		},
	})

	$.extend({
		msg: function (data) {
			var $body = window.frames.length != parent.frames.length ? $(window.parent.document).find('body') : $('body');
			var top = data.top ? 'style="padding-top:' + data.top + '"' : '';
			if (!$body.find('#msg-box_wasd')[0]) $body.append('<div class="side-massage-box-style" id="msg-box_wasd" ' + top + '></div>');

			var id = guid();

			var icon = data.icon && data.icon ? '<i class="fa fa-' + data.icon + '"></i>' : '';
			var closeBtn = data.noClose ? '' : '<a class="close">&times;</a>';
			var box_padding = 'style="padding:' + (data.padding || '15px') + '"';
			$body.find('#msg-box_wasd').append('<div class="msg-box msg-box-' + (data.color || 'info') + '" id="' + id + '" ' + box_padding + '">' + closeBtn + '<h4 class="title">' + icon + (data.title || '消息') + '</h4>' + data.text + '</div>');

			$body.find('#' + id + ' .close').click(function () {
				$(this).closeMsg(data.onClose);
			})

			setTimeout(function () { $body.find('#' + id).addClass('active') }, 5);

			if (data.time != 0) {
				setTimeout(function () {
					$body.find('#' + id + ' .close').closeMsg(data.onClose);
				}, data.time === undefined ? 3000 : data.time);
			}
			return id;
		},

	});
})();



