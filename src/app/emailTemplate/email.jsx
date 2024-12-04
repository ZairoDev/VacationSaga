export const PropertyListedTemplate = (userId, email) => {
  return `
	  <html>
	  <body>
		<h1>Hii</h1>
		<p>Someone has listed a property contact details are below contact them</p>
		<p>Contact details:</p>
		<p>${userId}</p>
		<p>${email}</p>
	  </body>
	  </html>
	`;
};

export const RegistrationTemplate = (emailID, password) => {
  return `
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="email=no">
	<title>Starto - All In One</title>
	<style type="text/css">
		body
		{
			margin: 0px !important;
			padding: 0px !important;
			display: block !important;
			min-width: 100% !important;
			width: 100% !important;
			-webkit-text-size-adjust: none;
			word-break: break-word;
		}
		table
		{
			border-spacing: 0;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}
		table td
		{
			border-collapse: collapse;
		}
		strong
		{
			font-weight: bold !important;
		}
		td img
		{
			-ms-interpolation-mode: bicubic;
			display: block;
			width: auto;
			max-width: auto;
			height: auto;
			margin: auto;
			display: block !important;
			border: 0px !important;
		}
		td p
		{
			margin: 0 !important;
			padding: 0 !important;
			display: inline-block !important;
			font-family: inherit !important;
		}
		td a
		{
			text-decoration: none !important;
		}
		table.hide-desktop,
		tr.hide-desktop,
		td.hide-desktop,
		br.hide-desktop
		{
			display: none !important;
		}
		.ExternalClass
		{
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div
		{
			line-height: inherit;
		}
		.ReadMsgBody
		{
			width: 100%;
			background-color: #FFFFFF;
		}
		a[x-apple-data-detectors]
		{
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}
		u+#body a
		{
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		}
		.undoreset a,
		.undoreset a:hover
		{
			text-decoration: none !important;
		}
		.yshortcuts a
		{
			border-bottom: none !important;
		}
		.ios-footer a
		{
			color: #aaaaaa !important;
			text-decoration: none;
		}
		.star:hover a,
		.star:hover~.star a
		{
			color: #FFCF0F !important;
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 400;
			src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 600;
			src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
		}
	</style>
	<style type="text/css"> </style>
	<style type="text/css">
		@media only screen and (max-width:600px)
		{
			td.img-responsive img
			{
				width: 100% !important;
				max-width: 100% !important;
				height: auto !important;
				margin: auto;
			}
			table.row
			{
				width: 100% !important;
				max-width: 100% !important;
			}
			table.left-float,
			td.left-float
			{
				float: left !important;
			}
			table.center-float,
			td.center-float
			{
				float: none !important;
			}
			table.right-float,
			td.right-float
			{
				float: right !important;
			}
			td.left-text
			{
				text-align: left !important;
			}
			td.center-text
			{
				text-align: center !important;
			}
			td.right-text
			{
				text-align: right !important;
			}
			td.container-padding
			{
				width: 100% !important;
				padding-left: 15px !important;
				padding-right: 15px !important;
			}
			table.hide-mobile,
			tr.hide-mobile,
			td.hide-mobile,
			br.hide-mobile
			{
				display: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: block !important;
			}
			td.menu-container
			{
				text-align: center !important;
			}
			td.autoheight
			{
				height: auto !important;
			}
			table.mobile-padding
			{
				margin: 15px 0 !important;
			}
			td.br-mobile-none br
			{
				display: none !important;
			}
		}
	</style>
</head>
<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
	<center>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
												</tr>
												<tr>
													<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
												</tr>
												<tr>
													<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">We got your&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Pass Key</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
									<tr>
										<td align="center">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hi Owner,</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">Registration Successful<br><br>You can access your account from the credentials given below<br><br>User Email ID : ${emailID};<br>Password : ${password};<br><a href="https://www.vacationsaga.com/login" style="text-size-adjust: 100%; text-decoration: none; color: #f4a53d;">LOGIN HERE&nbsp;<br></a><br><br>For any support please mail us on support@vacationsaga.com</td>
												</tr>
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
														<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
															<tr></tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
												</tr>
												<tr>
													<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>
`;
};

export const ResetPasswordTemplate = (hashedToken) => {
  return `
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="email=no">
	<title>Starto - All In One</title>
	<style type="text/css">
		body
		{
			margin: 0px !important;
			padding: 0px !important;
			display: block !important;
			min-width: 100% !important;
			width: 100% !important;
			-webkit-text-size-adjust: none;
			word-break: break-word;
		}
		table
		{
			border-spacing: 0;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}
		table td
		{
			border-collapse: collapse;
		}
		strong
		{
			font-weight: bold !important;
		}
		td img
		{
			-ms-interpolation-mode: bicubic;
			display: block;
			width: auto;
			max-width: auto;
			height: auto;
			margin: auto;
			display: block !important;
			border: 0px !important;
		}
		td p
		{
			margin: 0 !important;
			padding: 0 !important;
			display: inline-block !important;
			font-family: inherit !important;
		}
		td a
		{
			text-decoration: none !important;
		}
		table.hide-desktop,
		tr.hide-desktop,
		td.hide-desktop,
		br.hide-desktop
		{
			display: none !important;
		}
		.ExternalClass
		{
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div
		{
			line-height: inherit;
		}
		.ReadMsgBody
		{
			width: 100%;
			background-color: #FFFFFF;
		}
		a[x-apple-data-detectors]
		{
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}
		u+#body a
		{
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		}
		.undoreset a,
		.undoreset a:hover
		{
			text-decoration: none !important;
		}
		.yshortcuts a
		{
			border-bottom: none !important;
		}
		.ios-footer a
		{
			color: #aaaaaa !important;
			text-decoration: none;
		}
		.star:hover a,
		.star:hover~.star a
		{
			color: #FFCF0F !important;
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 400;
			src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 600;
			src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
		}
	</style>
	<style type="text/css"> </style>
	<style type="text/css">
		@media only screen and (max-width:600px)
		{
			td.img-responsive img
			{
				width: 100% !important;
				max-width: 100% !important;
				height: auto !important;
				margin: auto;
			}
			table.row
			{
				width: 100% !important;
				max-width: 100% !important;
			}
			table.left-float,
			td.left-float
			{
				float: left !important;
			}
			table.center-float,
			td.center-float
			{
				float: none !important;
			}
			table.right-float,
			td.right-float
			{
				float: right !important;
			}
			td.left-text
			{
				text-align: left !important;
			}
			td.center-text
			{
				text-align: center !important;
			}
			td.right-text
			{
				text-align: right !important;
			}
			td.container-padding
			{
				width: 100% !important;
				padding-left: 15px !important;
				padding-right: 15px !important;
			}
			table.hide-mobile,
			tr.hide-mobile,
			td.hide-mobile,
			br.hide-mobile
			{
				display: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: block !important;
			}
			td.menu-container
			{
				text-align: center !important;
			}
			td.autoheight
			{
				height: auto !important;
			}
			table.mobile-padding
			{
				margin: 15px 0 !important;
			}
			td.br-mobile-none br
			{
				display: none !important;
			}
		}
	</style>
</head>
<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
	<center>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
												</tr>
												<tr>
													<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
												</tr>
												<tr>
													<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">We got your&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Pass Key</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
									<tr>
										<td align="center">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hi Owner,</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">Looks like your forgot your password<br><br>
													 <p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                                                         To reset your password, please click the button below:
                                                    </p>
                                                    <table cellspacing="0" cellpadding="0" style="margin-top:  20px; margin-bottom: 20px;">
                                                    <tr>
                                                       <td align="center" width="300" height="40" bgcolor="#FF9800" style="border-radius: 5px;">
                                                      <a href="${process.env.NEXT_PUBLIC_URL}/resetpassword?token=${hashedToken}" 
                                                      target="_blank" 
                                                      style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 1px solid #FF9800; display: inline-block;">
                                                      Reset Your Password
                                                    </a>
                                                   </td>
    </tr>
  </table>
  <p style="font-family: Arial, sans-serif; font-size: 14px; color: #666;">
    If the button doesn't work, you can copy and paste this link into your browser:
    <br>
    <span style="color: #0066cc;">${process.env.NEXT_PUBLIC_URL}/resetpassword?token=${hashedToken}</span>
  </p>
													<br><br><br>For any support please mail us on support@vacationsaga.com</td>
												</tr>
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
														<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
															<tr></tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
												</tr>
												<tr>
													<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>
`;
};

export const ForgotPassword = (email, resetPasswordLink) => {
  return `
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="email=no">
	<title>Starto - All In One</title>
	<style type="text/css">
		body
		{
			margin: 0px !important;
			padding: 0px !important;
			display: block !important;
			min-width: 100% !important;
			width: 100% !important;
			-webkit-text-size-adjust: none;
			word-break: break-word;
		}
		table
		{
			border-spacing: 0;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}
		table td
		{
			border-collapse: collapse;
		}
		strong
		{
			font-weight: bold !important;
		}
		td img
		{
			-ms-interpolation-mode: bicubic;
			display: block;
			width: auto;
			max-width: auto;
			height: auto;
			margin: auto;
			display: block !important;
			border: 0px !important;
		}
		td p
		{
			margin: 0 !important;
			padding: 0 !important;
			display: inline-block !important;
			font-family: inherit !important;
		}
		td a
		{
			text-decoration: none !important;
		}
		table.hide-desktop,
		tr.hide-desktop,
		td.hide-desktop,
		br.hide-desktop
		{
			display: none !important;
		}
		.ExternalClass
		{
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div
		{
			line-height: inherit;
		}
		.ReadMsgBody
		{
			width: 100%;
			background-color: #FFFFFF;
		}
		a[x-apple-data-detectors]
		{
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}
		u+#body a
		{
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		}
		.undoreset a,
		.undoreset a:hover
		{
			text-decoration: none !important;
		}
		.yshortcuts a
		{
			border-bottom: none !important;
		}
		.ios-footer a
		{
			color: #aaaaaa !important;
			text-decoration: none;
		}
		.star:hover a,
		.star:hover~.star a
		{
			color: #FFCF0F !important;
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 400;
			src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 600;
			src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
		}
	</style>
	<style type="text/css"> </style>
	<style type="text/css">
		@media only screen and (max-width:600px)
		{
			td.img-responsive img
			{
				width: 100% !important;
				max-width: 100% !important;
				height: auto !important;
				margin: auto;
			}
			table.row
			{
				width: 100% !important;
				max-width: 100% !important;
			}
			table.left-float,
			td.left-float
			{
				float: left !important;
			}
			table.center-float,
			td.center-float
			{
				float: none !important;
			}
			table.right-float,
			td.right-float
			{
				float: right !important;
			}
			td.left-text
			{
				text-align: left !important;
			}
			td.center-text
			{
				text-align: center !important;
			}
			td.right-text
			{
				text-align: right !important;
			}
			td.container-padding
			{
				width: 100% !important;
				padding-left: 15px !important;
				padding-right: 15px !important;
			}
			table.hide-mobile,
			tr.hide-mobile,
			td.hide-mobile,
			br.hide-mobile
			{
				display: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: block !important;
			}
			td.menu-container
			{
				text-align: center !important;
			}
			td.autoheight
			{
				height: auto !important;
			}
			table.mobile-padding
			{
				margin: 15px 0 !important;
			}
			td.br-mobile-none br
			{
				display: none !important;
			}
		}
	</style>
</head>
<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
	<center>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
												</tr>
												<tr>
													<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
												</tr>
												<tr>
													<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">We got your&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Pass Key</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
								<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
									<tr>
										<td align="center">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hi Owner,</td>
												</tr>
												<tr>
												 "${resetPasswordLink}"
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">Registration Successful<br><br>You can access your account from the credentials given below<br><br>Reset Password Link :&nbsp;<br>Password : 6473<br><a href="{resetPasswordLink}" style="text-size-adjust: 100%; text-decoration: none; color: #f4a53d;">Reset Your Password &nbsp;<br></a><br><br>For any support please mail us on support@vacationsaga.com</td>
												</tr>
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
												</tr>
												<tr>
													<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
														<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
															<tr></tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
												</tr>
												<tr>
													<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>
`;
};

export const VerificationTemplate = (hashedToken, password, email) => {
  return `
	<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="date=no">
		<meta name="format-detection" content="address=no">
		<meta name="format-detection" content="email=no">
		<title>Starto - All In One</title>
		<style type="text/css">
			body
			{
				margin: 0px !important;
				padding: 0px !important;
				display: block !important;
				min-width: 100% !important;
				width: 100% !important;
				-webkit-text-size-adjust: none;
				word-break: break-word;
			}
			table
			{
				border-spacing: 0;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			table td
			{
				border-collapse: collapse;
			}
			strong
			{
				font-weight: bold !important;
			}
			td img
			{
				-ms-interpolation-mode: bicubic;
				display: block;
				width: auto;
				max-width: auto;
				height: auto;
				margin: auto;
				display: block !important;
				border: 0px !important;
			}
			td p
			{
				margin: 0 !important;
				padding: 0 !important;
				display: inline-block !important;
				font-family: inherit !important;
			}
			td a
			{
				text-decoration: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: none !important;
			}
			.ExternalClass
			{
				width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div
			{
				line-height: inherit;
			}
			.ReadMsgBody
			{
				width: 100%;
				background-color: #FFFFFF;
			}
			a[x-apple-data-detectors]
			{
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
			u+#body a
			{
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			}
			.undoreset a,
			.undoreset a:hover
			{
				text-decoration: none !important;
			}
			.yshortcuts a
			{
				border-bottom: none !important;
			}
			.ios-footer a
			{
				color: #aaaaaa !important;
				text-decoration: none;
			}
			.star:hover a,
			.star:hover~.star a
			{
				color: #FFCF0F !important;
			}
		</style>
		<style type="text/css">
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 400;
				src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 600;
				src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 400;
				src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 600;
				src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
			}
		</style>
		<style type="text/css"> </style>
		<style type="text/css">
			@media only screen and (max-width:600px)
			{
				td.img-responsive img
				{
					width: 100% !important;
					max-width: 100% !important;
					height: auto !important;
					margin: auto;
				}
				table.row
				{
					width: 100% !important;
					max-width: 100% !important;
				}
				table.left-float,
				td.left-float
				{
					float: left !important;
				}
				table.center-float,
				td.center-float
				{
					float: none !important;
				}
				table.right-float,
				td.right-float
				{
					float: right !important;
				}
				td.left-text
				{
					text-align: left !important;
				}
				td.center-text
				{
					text-align: center !important;
				}
				td.right-text
				{
					text-align: right !important;
				}
				td.container-padding
				{
					width: 100% !important;
					padding-left: 15px !important;
					padding-right: 15px !important;
				}
				table.hide-mobile,
				tr.hide-mobile,
				td.hide-mobile,
				br.hide-mobile
				{
					display: none !important;
				}
				table.hide-desktop,
				tr.hide-desktop,
				td.hide-desktop,
				br.hide-desktop
				{
					display: block !important;
				}
				td.menu-container
				{
					text-align: center !important;
				}
				td.autoheight
				{
					height: auto !important;
				}
				table.mobile-padding
				{
					margin: 15px 0 !important;
				}
				td.br-mobile-none br
				{
					display: none !important;
				}
			}
		</style>
	</head>
	<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
		<center>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
													</tr>
													<tr>
														<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
													</tr>
													<tr>
														<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">We got your&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Pass Key</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
										<tr>
											<td align="center">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hi Owner,</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">Registration Successful<br><br>You can access your account from the credentials given below<br>
														<br>Password: ${password}<br>
														<br>
													    </br>
														<br>For any support please mail us on support@vacationsaga.com</td>
                                                        <br>  
													</tr>
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
									<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
															<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
																<tr></tr>
															</table>
														</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
													</tr>
													<tr>
														<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
													</tr>
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</center>
	</body>
	</html>
	`;
};

export const OwnerBookingTemplate = (
  ownerName,
  bookingId,
  startDate,
  endDate,
  price
) => {
  return `

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="email=no">
	<title>Starto - All In One</title>
	<style type="text/css">
		body
		{
			margin: 0px !important;
			padding: 0px !important;
			display: block !important;
			min-width: 100% !important;
			width: 100% !important;
			-webkit-text-size-adjust: none;
			word-break: break-word;
		}
		table
		{
			border-spacing: 0;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}
		table td
		{
			border-collapse: collapse;
		}
		strong
		{
			font-weight: bold !important;
		}
		td img
		{
			-ms-interpolation-mode: bicubic;
			display: block;
			width: auto;
			max-width: auto;
			height: auto;
			margin: auto;
			display: block !important;
			border: 0px !important;
		}
		td p
		{
			margin: 0 !important;
			padding: 0 !important;
			display: inline-block !important;
			font-family: inherit !important;
		}
		td a
		{
			text-decoration: none !important;
		}
		table.hide-desktop,
		tr.hide-desktop,
		td.hide-desktop,
		br.hide-desktop
		{
			display: none !important;
		}
		.ExternalClass
		{
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div
		{
			line-height: inherit;
		}
		.ReadMsgBody
		{
			width: 100%;
			background-color: #FFFFFF;
		}
		a[x-apple-data-detectors]
		{
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}
		u+#body a
		{
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		}
		.undoreset a,
		.undoreset a:hover
		{
			text-decoration: none !important;
		}
		.yshortcuts a
		{
			border-bottom: none !important;
		}
		.ios-footer a
		{
			color: #aaaaaa !important;
			text-decoration: none;
		}
		.star:hover a,
		.star:hover~.star a
		{
			color: #FFCF0F !important;
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 400;
			src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 600;
			src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Lora';
			font-style: italic;
			font-weight: 400;
			src: local('Lora Italic'), local('Lora-Italic'), url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LIftL.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Lora';
			font-style: normal;
			font-weight: 400;
			src: local('Lora Regular'), local('Lora-Regular'), url(https://fonts.gstatic.com/s/lora/v14/0QIvMX1D_JOuMwr7Iw.woff2) format('woff2');
		}
	</style>
	<style type="text/css">
		@media only screen and (max-width:600px)
		{
			td.img-responsive img
			{
				width: 100% !important;
				max-width: 100% !important;
				height: auto !important;
				margin: auto;
			}
			table.row
			{
				width: 100% !important;
				max-width: 100% !important;
			}
			table.left-float,
			td.left-float
			{
				float: left !important;
			}
			table.center-float,
			td.center-float
			{
				float: none !important;
			}
			table.right-float,
			td.right-float
			{
				float: right !important;
			}
			td.left-text
			{
				text-align: left !important;
			}
			td.center-text
			{
				text-align: center !important;
			}
			td.right-text
			{
				text-align: right !important;
			}
			td.container-padding
			{
				width: 100% !important;
				padding-left: 15px !important;
				padding-right: 15px !important;
			}
			table.hide-mobile,
			tr.hide-mobile,
			td.hide-mobile,
			br.hide-mobile
			{
				display: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: block !important;
			}
			td.menu-container
			{
				text-align: center !important;
			}
			td.autoheight
			{
				height: auto !important;
			}
			table.mobile-padding
			{
				margin: 15px 0 !important;
			}
			td.br-mobile-none br
			{
				display: none !important;
			}
		}
	</style>
</head>
<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
	<center>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:10px;height:10px;line-height:10px;">&nbsp;</td>
												</tr>
												<tr>
													
												</tr>
												<tr>
													<td  style="font-size:10px;height:10px;line-height:10px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 32px; height: 32px; line-height: 32px;">&nbsp;</td>
												</tr>
												<tr>
													<td height="45" align="center" valign="middle" class="autoheight"><a href="http://example.com" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size: 17px; height: 17px; line-height: 17px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #e17e1d;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">Guest is waiting for your response, please accept the booking.</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;padding:0px;padding-bottom:30px;">Booking is on Hold</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<table border="0" align="center" cellpadding="0" cellspacing="0">
														
														</table>
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #e17e1d;">
								<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
									<tr>
										<td align="center">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@transaction-order-onhold.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hello ${ownerName}</td>
												</tr>
												<tr>
													<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;padding:0px;">Your booking request is on-hold until you accept the booking&nbsp; request guest is waiting . Your Guest details are shown below for your reference:</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Booking Request ID : <span style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:28px;font-weight:400;letter-spacing:0px;">Id:${bookingId}</span></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Booking request Date : <span style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:28px;font-weight:400;letter-spacing:0px;">${new Date(
                                  Date.now()
                                )
                                  .toLocaleDateString()
                                  .split("T")
                                  .join("-")}</span></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Booking Status :</td>
															</tr>
															<tr>
																<td align="center" valign="middle">
																	<table border="0" align="left" cellpadding="0" cellspacing="0" class="center-float">
																		<tr>
																			<td align="left" valign="middle" style="background-color:#FFF6D6;color:#FED330;font-family:'Poppins', sans-serif;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;padding:0px 10px 0 10px;border-radius:4px;">On - HOLD</td>
																		</tr>
																	</table>
																</td>
															</tr>
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
															<tr>
																
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
														
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="100" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:100px;max-width:100px;">
															<tbody></tbody>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="300" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:300px;max-width:300px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Check In Date</td>
															</tr>
															<tr>
															
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="90" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:90px;max-width:90px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:20px;line-height:30px;font-weight:600;letter-spacing:0px;">${
                                  new Date(startDate)
                                    .toLocaleDateString()
                                    .split("T")[0]
                                }</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="100" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:100px;max-width:100px;">
															<tbody></tbody>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="300" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:300px;max-width:300px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Check Out Date</td>
															</tr>
															<tr>
																
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="90" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:90px;max-width:90px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:20px;line-height:30px;font-weight:600;letter-spacing:0px;">${
                                  new Date(endDate)
                                    .toLocaleDateString()
                                    .split("T")[0]
                                }</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="255" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:255px;max-width:255px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:22px;line-height:32px;font-weight:600;letter-spacing:0px;">Estimated Rent&nbsp;</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="255" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:255px;max-width:255px;">
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:22px;line-height:32px;font-weight:600;letter-spacing:0px;">${price}</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<table border="0" align="center" cellpadding="0" cellspacing="0">
															<tr>
																<td align="center" style="background-color: transparent; display: block; border-radius: 4px; border-color: #e17e1d; border-width: 2px; border-style: solid;">
																<a href="${
                                  process.env.NEXT_PUBLIC_URL
                                }/bookings/bookingConfirmation/${bookingId}" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #212121; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 1px solid #FF9800; display: inline-block;">View Booking</a>
																</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
														<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
															<tr></tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">Regards, Vacation Saga</td>
												</tr>
											
												<tr>
													<td align="center" valign="middle"><a href="http://example.com" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>

	`;
};

export const TravellerBookingTemplate = (
  startDate,
  endDate,
  price,
  travellerName
) => {
  return `
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="date=no">
	<meta name="format-detection" content="address=no">
	<meta name="format-detection" content="email=no">
	<title>Starto - All In One</title>
	<style type="text/css">
		body
		{
			margin: 0px !important;
			padding: 0px !important;
			display: block !important;
			min-width: 100% !important;
			width: 100% !important;
			-webkit-text-size-adjust: none;
			word-break: break-word;
		}
		table
		{
			border-spacing: 0;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}
		table td
		{
			border-collapse: collapse;
		}
		strong
		{
			font-weight: bold !important;
		}
		td img
		{
			-ms-interpolation-mode: bicubic;
			display: block;
			width: auto;
			max-width: auto;
			height: auto;
			margin: auto;
			display: block !important;
			border: 0px !important;
		}
		td p
		{
			margin: 0 !important;
			padding: 0 !important;
			display: inline-block !important;
			font-family: inherit !important;
		}
		td a
		{
			text-decoration: none !important;
		}
		table.hide-desktop,
		tr.hide-desktop,
		td.hide-desktop,
		br.hide-desktop
		{
			display: none !important;
		}
		.ExternalClass
		{
			width: 100%;
		}
		.ExternalClass,
		.ExternalClass p,
		.ExternalClass span,
		.ExternalClass font,
		.ExternalClass td,
		.ExternalClass div
		{
			line-height: inherit;
		}
		.ReadMsgBody
		{
			width: 100%;
			background-color: #FFFFFF;
		}
		a[x-apple-data-detectors]
		{
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}
		u+#body a
		{
			color: inherit;
			text-decoration: none;
			font-size: inherit;
			font-family: inherit;
			font-weight: inherit;
			line-height: inherit;
		}
		.undoreset a,
		.undoreset a:hover
		{
			text-decoration: none !important;
		}
		.yshortcuts a
		{
			border-bottom: none !important;
		}
		.ios-footer a
		{
			color: #aaaaaa !important;
			text-decoration: none;
		}
		.star:hover a,
		.star:hover~.star a
		{
			color: #FFCF0F !important;
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 400;
			src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: italic;
			font-weight: 600;
			src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 400;
			src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Poppins';
			font-style: normal;
			font-weight: 600;
			src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
		}
	</style>
	<style type="text/css">
		@font-face
		{
			font-family: 'Lora';
			font-style: italic;
			font-weight: 400;
			src: local('Lora Italic'), local('Lora-Italic'), url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LIftL.woff2) format('woff2');
		}
		@font-face
		{
			font-family: 'Lora';
			font-style: normal;
			font-weight: 400;
			src: local('Lora Regular'), local('Lora-Regular'), url(https://fonts.gstatic.com/s/lora/v14/0QIvMX1D_JOuMwr7Iw.woff2) format('woff2');
		}
	</style>
	<style type="text/css">
		@media only screen and (max-width:600px)
		{
			td.img-responsive img
			{
				width: 100% !important;
				max-width: 100% !important;
				height: auto !important;
				margin: auto;
			}
			table.row
			{
				width: 100% !important;
				max-width: 100% !important;
			}
			table.left-float,
			td.left-float
			{
				float: left !important;
			}
			table.center-float,
			td.center-float
			{
				float: none !important;
			}
			table.right-float,
			td.right-float
			{
				float: right !important;
			}
			td.left-text
			{
				text-align: left !important;
			}
			td.center-text
			{
				text-align: center !important;
			}
			td.right-text
			{
				text-align: right !important;
			}
			td.container-padding
			{
				width: 100% !important;
				padding-left: 15px !important;
				padding-right: 15px !important;
			}
			table.hide-mobile,
			tr.hide-mobile,
			td.hide-mobile,
			br.hide-mobile
			{
				display: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: block !important;
			}
			td.menu-container
			{
				text-align: center !important;
			}
			td.autoheight
			{
				height: auto !important;
			}
			table.mobile-padding
			{
				margin: 15px 0 !important;
			}
			td.br-mobile-none br
			{
				display: none !important;
			}
		}
	</style>
</head>
<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
	<center>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:10px;height:10px;line-height:10px;">&nbsp;</td>
												</tr>
												<tr>
													
												</tr>
												<tr>
													<td  style="font-size:10px;height:10px;line-height:10px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size: 32px; height: 32px; line-height: 32px;">&nbsp;</td>
												</tr>
												<tr>
													<td height="45" align="center" valign="middle" class="autoheight"><a href="http://example.com" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size: 17px; height: 17px; line-height: 17px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #e17e1d;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
											
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;padding:0px;padding-bottom:30px;">Booking is on Hold</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<table border="0" align="center" cellpadding="0" cellspacing="0">
														
														</table>
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#4B7BEC" style="background-color: #e17e1d;">
								<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
									<tr>
										<td align="center">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
												<tr>
													<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@transaction-order-onhold.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hello ${travellerName}</td>
												</tr>
												<tr>
													<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;padding:0px;">Thank you for your booking request! Your reservation is currently on hold, pending acceptance by the host. The host will review your request, and you’ll receive an update soon. Below are the details for your reference:</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Booking Status :</td>
															</tr>
															<tr>
																<td align="center" valign="middle">
																	<table border="0" align="left" cellpadding="0" cellspacing="0" class="center-float">
																		<tr>
																			<td align="left" valign="middle" style="background-color:#FFF6D6;color:#FED330;font-family:'Poppins', sans-serif;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;padding:0px 10px 0 10px;border-radius:4px;">On - HOLD</td>
																		</tr>
																	</table>
																</td>
															</tr>
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
															<tr>
																
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="250" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:250px;max-width:250px;">
														
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="100" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:100px;max-width:100px;">
															<tbody></tbody>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="300" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:300px;max-width:300px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Check In Date</td>
															</tr>
															<tr>
															
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="90" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:90px;max-width:90px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:20px;line-height:30px;font-weight:600;letter-spacing:0px;">${
                                  new Date(startDate)
                                    .toLocaleDateString()
                                    .split("T")[0]
                                }</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="100" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:100px;max-width:100px;">
															<tbody></tbody>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="20" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:20px;max-width:20px;">
															<tr>
																<td valign="middle" align="center" height="20"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="300" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:300px;max-width:300px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:5px;">Check Out Date</td>
															</tr>
															<tr>
																
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="90" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:90px;max-width:90px;">
															<tr>
																<td valign="middle" align="center" class="autoheight" height="10"></td>
															</tr>
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:20px;line-height:30px;font-weight:600;letter-spacing:0px;">${
                                  new Date(endDate)
                                    .toLocaleDateString()
                                    .split("T")[0]
                                }</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
														<table width="255" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:255px;max-width:255px;">
															<tr>
																<td align="left" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:22px;line-height:32px;font-weight:600;letter-spacing:0px;">Estimated Rent&nbsp;</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="10" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:10px;max-width:10px;">
															<tr>
																<td valign="middle" align="center" height="10"></td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
														<table width="255" border="0" cellpadding="0" cellspacing="0" align="left" class="row" style="width:255px;max-width:255px;">
															<tr>
																<td align="right" valign="middle" class="center-text" style="font-family:'Poppins', sans-serif;color:#191919;font-size:22px;line-height:32px;font-weight:600;letter-spacing:0px;">${price}</td>
															</tr>
														</table>
														<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
													</td>
												</tr>
												<tr>
													<td  style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle">
														<table border="0" align="center" cellpadding="0" cellspacing="0">
															<tr>
																<td align="center" style="background-color: transparent; display: block; border-radius: 4px; border-color: #e17e1d; border-width: 2px; border-style: solid;">
																
																</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
								<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:30px;height:30px;line-height:30px;">&nbsp;</td>
												</tr>
												<tr>
													<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
												</tr>
												<tr>
													<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
			<tr>
				<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
					<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
						<tr>
							<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
								<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
									<tr>
										<td align="center" class="container-padding">
											<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
												<tr>
													<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
														<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
															<tr></tr>
														</table>
													</td>
												</tr>
												<tr>
													<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">Regards, Vacation Saga</td>
												</tr>
											
												<tr>
													<td align="center" valign="middle"><a href="http://example.com" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
												</tr>
												<tr>
													<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>

	`;
};

export const BookingCancellationEmailToOwner = (
  emails,
  bookingId,
  cancellationReason
) => {
  return `
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="date=no">
		<meta name="format-detection" content="address=no">
		<meta name="format-detection" content="email=no">
		<title>Starto - All In One</title>
		<style type="text/css">
			body
			{
				margin: 0px !important;
				padding: 0px !important;
				display: block !important;
				min-width: 100% !important;
				width: 100% !important;
				-webkit-text-size-adjust: none;
				word-break: break-word;
			}
			table
			{
				border-spacing: 0;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			table td
			{
				border-collapse: collapse;
			}
			strong
			{
				font-weight: bold !important;
			}
			td img
			{
				-ms-interpolation-mode: bicubic;
				display: block;
				width: auto;
				max-width: auto;
				height: auto;
				margin: auto;
				display: block !important;
				border: 0px !important;
			}
			td p
			{
				margin: 0 !important;
				padding: 0 !important;
				display: inline-block !important;
				font-family: inherit !important;
			}
			td a
			{
				text-decoration: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: none !important;
			}
			.ExternalClass
			{
				width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div
			{
				line-height: inherit;
			}
			.ReadMsgBody
			{
				width: 100%;
				background-color: #FFFFFF;
			}
			a[x-apple-data-detectors]
			{
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
			u+#body a
			{
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			}
			.undoreset a,
			.undoreset a:hover
			{
				text-decoration: none !important;
			}
			.yshortcuts a
			{
				border-bottom: none !important;
			}
			.ios-footer a
			{
				color: #aaaaaa !important;
				text-decoration: none;
			}
			.star:hover a,
			.star:hover~.star a
			{
				color: #FFCF0F !important;
			}
		</style>
		<style type="text/css">
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 400;
				src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 600;
				src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 400;
				src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 600;
				src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
			}
		</style>
		<style type="text/css"> </style>
		<style type="text/css">
			@media only screen and (max-width:600px)
			{
				td.img-responsive img
				{
					width: 100% !important;
					max-width: 100% !important;
					height: auto !important;
					margin: auto;
				}
				table.row
				{
					width: 100% !important;
					max-width: 100% !important;
				}
				table.left-float,
				td.left-float
				{
					float: left !important;
				}
				table.center-float,
				td.center-float
				{
					float: none !important;
				}
				table.right-float,
				td.right-float
				{
					float: right !important;
				}
				td.left-text
				{
					text-align: left !important;
				}
				td.center-text
				{
					text-align: center !important;
				}
				td.right-text
				{
					text-align: right !important;
				}
				td.container-padding
				{
					width: 100% !important;
					padding-left: 15px !important;
					padding-right: 15px !important;
				}
				table.hide-mobile,
				tr.hide-mobile,
				td.hide-mobile,
				br.hide-mobile
				{
					display: none !important;
				}
				table.hide-desktop,
				tr.hide-desktop,
				td.hide-desktop,
				br.hide-desktop
				{
					display: block !important;
				}
				td.menu-container
				{
					text-align: center !important;
				}
				td.autoheight
				{
					height: auto !important;
				}
				table.mobile-padding
				{
					margin: 15px 0 !important;
				}
				td.br-mobile-none br
				{
					display: none !important;
				}
			}
		</style>
	</head>
	<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
		<center>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
													</tr>
													<tr>
														<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
													</tr>
													<tr>
														<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Booking Cancellation</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
										<tr>
											<td align="center">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hello ${emails}</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">
                                                         <p>This is to confirm that the booking for <strong>BookingId: ${bookingId}</strong>  has been successfully cancelled.</p>
                                                         <p> beacuse of the reason mentioned below.</p>
                                                        <p>${cancellationReason}</p>
                                                          <p>We understand that circumstances can change, and we appreciate you keeping us informed. If you have any questions or need further assistance, please feel free to reach out.</p>
	
                                                 <br>  
													</tr>
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
									<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
															<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
																<tr></tr>
															</table>
														</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
													</tr>
													<tr>
														<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
													</tr>
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</center>
	</body>
	</html>`;
};
export const sendBookingCancellationEmailToTravellerTemplate = (
  bookingId,
  travellerName
) => {
  return `
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="format-detection" content="telephone=no">
		<meta name="format-detection" content="date=no">
		<meta name="format-detection" content="address=no">
		<meta name="format-detection" content="email=no">
		<title>Starto - All In One</title>
		<style type="text/css">
			body
			{
				margin: 0px !important;
				padding: 0px !important;
				display: block !important;
				min-width: 100% !important;
				width: 100% !important;
				-webkit-text-size-adjust: none;
				word-break: break-word;
			}
			table
			{
				border-spacing: 0;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			table td
			{
				border-collapse: collapse;
			}
			strong
			{
				font-weight: bold !important;
			}
			td img
			{
				-ms-interpolation-mode: bicubic;
				display: block;
				width: auto;
				max-width: auto;
				height: auto;
				margin: auto;
				display: block !important;
				border: 0px !important;
			}
			td p
			{
				margin: 0 !important;
				padding: 0 !important;
				display: inline-block !important;
				font-family: inherit !important;
			}
			td a
			{
				text-decoration: none !important;
			}
			table.hide-desktop,
			tr.hide-desktop,
			td.hide-desktop,
			br.hide-desktop
			{
				display: none !important;
			}
			.ExternalClass
			{
				width: 100%;
			}
			.ExternalClass,
			.ExternalClass p,
			.ExternalClass span,
			.ExternalClass font,
			.ExternalClass td,
			.ExternalClass div
			{
				line-height: inherit;
			}
			.ReadMsgBody
			{
				width: 100%;
				background-color: #FFFFFF;
			}
			a[x-apple-data-detectors]
			{
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
			u+#body a
			{
				color: inherit;
				text-decoration: none;
				font-size: inherit;
				font-family: inherit;
				font-weight: inherit;
				line-height: inherit;
			}
			.undoreset a,
			.undoreset a:hover
			{
				text-decoration: none !important;
			}
			.yshortcuts a
			{
				border-bottom: none !important;
			}
			.ios-footer a
			{
				color: #aaaaaa !important;
				text-decoration: none;
			}
			.star:hover a,
			.star:hover~.star a
			{
				color: #FFCF0F !important;
			}
		</style>
		<style type="text/css">
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 400;
				src: local('Poppins Italic'), local('Poppins-Italic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: italic;
				font-weight: 600;
				src: local('Poppins SemiBold Italic'), local('Poppins-SemiBoldItalic'), url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 400;
				src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
			}
			@font-face
			{
				font-family: 'Poppins';
				font-style: normal;
				font-weight: 600;
				src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
			}
		</style>
		<style type="text/css"> </style>
		<style type="text/css">
			@media only screen and (max-width:600px)
			{
				td.img-responsive img
				{
					width: 100% !important;
					max-width: 100% !important;
					height: auto !important;
					margin: auto;
				}
				table.row
				{
					width: 100% !important;
					max-width: 100% !important;
				}
				table.left-float,
				td.left-float
				{
					float: left !important;
				}
				table.center-float,
				td.center-float
				{
					float: none !important;
				}
				table.right-float,
				td.right-float
				{
					float: right !important;
				}
				td.left-text
				{
					text-align: left !important;
				}
				td.center-text
				{
					text-align: center !important;
				}
				td.right-text
				{
					text-align: right !important;
				}
				td.container-padding
				{
					width: 100% !important;
					padding-left: 15px !important;
					padding-right: 15px !important;
				}
				table.hide-mobile,
				tr.hide-mobile,
				td.hide-mobile,
				br.hide-mobile
				{
					display: none !important;
				}
				table.hide-desktop,
				tr.hide-desktop,
				td.hide-desktop,
				br.hide-desktop
				{
					display: block !important;
				}
				td.menu-container
				{
					text-align: center !important;
				}
				td.autoheight
				{
					height: auto !important;
				}
				table.mobile-padding
				{
					margin: 15px 0 !important;
				}
				td.br-mobile-none br
				{
					display: none !important;
				}
			}
		</style>
	</head>
	<body style="mso-line-height-rule:exactly; word-break:break-word; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; margin:0; padding:0; width:100%" width="100%">
		<center>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #f1f1f1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ffffff;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 10px; height: 10px; line-height: 10px;">&nbsp;</td>
													</tr>
													<tr>
														<td height="45" align="center" valign="middle" class="autoheight"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png" width="230" border="0" alt="logo" style="width: 230px; border: 0px; display: inline-block !important; border-radius: 0px;"></a></td>
													</tr>
													<tr>
														<td  style="font-size: 16px; height: 16px; line-height: 16px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td  style="font-size: 4px; height: 4px; line-height: 4px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:16px;line-height:26px;font-weight:600;letter-spacing:0.5px;padding:0;padding-bottom:5px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#FFFFFF;font-size:38px;line-height:48px;font-weight:400;letter-spacing:0px;">Booking Cancellation</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color:#F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#4B7BEC" style="background-color: #ff7628;">
									<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
										<tr>
											<td align="center">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%;max-width:100%;">
													<tr>
														<td align="center" valign="middle" class="img-responsive"><img src="https://editor.maool.com/images/starto/hero@notification-resetpassword.png" border="0" width="600" alt="Header" style="display:inline-block!important;border:0;width:600px;max-width:600px;"></td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;padding:0px;padding-bottom:20px;">Hello ${travellerName}</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family: Poppins, sans-serif; color: #595959; font-size: 16px; line-height: 26px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 40px;">
                                                         <p>This is to confirm that the booking for <strong>BookingId: ${bookingId}</strong>  has been cancelled.</p></p>
                                                          <p> If you have any questions or need further assistance, please feel free to reach out.</p>
	
                                                 <br>  
													</tr>
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size: 0px; height: 0px; line-height: 0px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#191919;font-size:18px;line-height:28px;font-weight:600;letter-spacing:0px;">Thank You,</td>
													</tr>
													<tr>
														<td align="left" valign="middle" style="font-family:'Poppins', sans-serif;color:#595959;font-size:16px;line-height:26px;font-weight:400;letter-spacing:0px;">Team Vacation Saga</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
									<table border="0" width="520" align="center" cellpadding="0" cellspacing="0" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
													<tr>
														<td style="background-color:#F1F1F1;font-size:1px;height:1px;line-height:1px;">&nbsp;</td>
													</tr>
													<tr>
														<td  style="font-size:15px;height:15px;line-height:15px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
				<tr>
					<td align="center" valign="middle" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
						<table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row" style="width:600px;max-width:600px;">
							<tr>
								<td align="center" bgcolor="#F1F1F1" style="background-color: #F1F1F1;">
									<table width="520" border="0" cellpadding="0" cellspacing="0" align="center" class="row" style="width:520px;max-width:520px;">
										<tr>
											<td align="center" class="container-padding">
												<table border="0" width="100%" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:100%;">
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
													<tr>
														<td align="center" valign="middle" style="padding:0;padding-bottom:20px;">
															<table cellpadding="0" cellspacing="0" align="center" class="center-float" style="border:0;border-collapse:collapse;border-spacing:0;">
																<tr></tr>
															</table>
														</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="br-mobile-none" style="font-family:'Poppins', sans-serif;color:#595959;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:20px;">&nbsp;Regards, Vacation Saga</td>
													</tr>
													<tr>
														<td align="center" valign="middle" class="center-text" style="font-family: Poppins, sans-serif; color: #494949; font-size: 14px; line-height: 24px; font-weight: 400; letter-spacing: 0px; padding: 0px 0px 30px;"><a href="https://www.vacationsaga.com/privacy-policy" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Privacy </a>&nbsp; &nbsp;<a href="https://www.vacationsaga.com/login" data-color="Links" style="border: 0px; color: #353535; text-decoration: underline !important;">Account </a>&nbsp; <u><a href="https://www.vacationsaga.com/contact" style="text-size-adjust: 100%; text-decoration: none; color: #353535;">C</a>ontact Us</u></td>
													</tr>
													<tr>
														<td align="center" valign="middle"><a href="https://www.vacationsaga.com/" style="text-decoration:none;border:0px;"><img src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png" width="40" border="0" alt="logo" style="width:40px;border:0px;display:inline!important;"></a></td>
													</tr>
													<tr>
														<td  style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</center>
	</body>
	</html>
  `;
};

export const TravellerBookingConfirmationTemplate = (
  propertyId,
  travellerName,
  bookingId,
  startDate,
  endDate,
  price,
  paymentToken
) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if (gte mso 9)|(IE)
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:AllowPNG /><o:PixelsPerInch
            >96</o:PixelsPerInch
          ></o:OfficeDocumentSettings
        ></xml
      ><!
    [endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />
    <title>Booking Confirmation Email</title>
    <style type="text/css">
      body {
        margin: 0px !important;
        padding: 0px !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        -webkit-text-size-adjust: none;
        word-break: break-word;
      }
      table {
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      table td {
        border-collapse: collapse;
      }
      strong {
        font-weight: bold !important;
      }
      td img {
        -ms-interpolation-mode: bicubic;
        display: block;
        width: auto;
        max-width: auto;
        height: auto;
        margin: auto;
        display: block !important;
        border: 0px !important;
      }
      td p {
        margin: 0 !important;
        padding: 0 !important;
        display: inline-block !important;
        font-family: inherit !important;
      }
      td a {
        text-decoration: none !important;
      }
      table.hide-desktop,
      tr.hide-desktop,
      td.hide-desktop,
      br.hide-desktop {
        display: none !important;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: inherit;
      }
      .ReadMsgBody {
        width: 100%;
        background-color: #ffffff;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      .undoreset a,
      .undoreset a:hover {
        text-decoration: none !important;
      }
      .yshortcuts a {
        border-bottom: none !important;
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: none;
      }
      .star:hover a,
      .star:hover ~ .star a {
        color: #ffcf0f !important;
      }
    </style>
    <style type="text/css">
      @font-face {
        font-family: "Poppins";
        font-style: italic;
        font-weight: 400;
        src: local("Poppins Italic"), local("Poppins-Italic"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: italic;
        font-weight: 600;
        src: local("Poppins SemiBold Italic"), local("Poppins-SemiBoldItalic"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        src: local("Poppins Regular"), local("Poppins-Regular"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        src: local("Poppins SemiBold"), local("Poppins-SemiBold"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2)
            format("woff2");
      }
    </style>
    <style type="text/css">
      @font-face {
        font-family: "Lora";
        font-style: italic;
        font-weight: 400;
        src: local("Lora Italic"), local("Lora-Italic"),
          url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LIftL.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Lora";
        font-style: normal;
        font-weight: 400;
        src: local("Lora Regular"), local("Lora-Regular"),
          url(https://fonts.gstatic.com/s/lora/v14/0QIvMX1D_JOuMwr7Iw.woff2)
            format("woff2");
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 600px) {
        td.img-responsive img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto;
        }
        table.row {
          width: 100% !important;
          max-width: 100% !important;
        }
        table.left-float,
        td.left-float {
          float: left !important;
        }
        table.center-float,
        td.center-float {
          float: none !important;
        }
        table.right-float,
        td.right-float {
          float: right !important;
        }
        td.left-text {
          text-align: left !important;
        }
        td.center-text {
          text-align: center !important;
        }
        td.right-text {
          text-align: right !important;
        }
        td.container-padding {
          width: 100% !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        table.hide-mobile,
        tr.hide-mobile,
        td.hide-mobile,
        br.hide-mobile {
          display: none !important;
        }
        table.hide-desktop,
        tr.hide-desktop,
        td.hide-desktop,
        br.hide-desktop {
          display: block !important;
        }
        td.menu-container {
          text-align: center !important;
        }
        td.autoheight {
          height: auto !important;
        }
        table.mobile-padding {
          margin: 15px 0 !important;
        }
        td.br-mobile-none br {
          display: none !important;
        }
      }
    </style>
  </head>
  <body
    style="
      mso-line-height-rule: exactly;
      word-break: break-word;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    "
    width="100%"
  >
    <center>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#F1F1F1"
                  style="background-color: #f1f1f1"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 10px;
                                height: 10px;
                                line-height: 10px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="right"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Lora', serif;
                                font-size: 12px;
                                line-height: 22px;
                                font-weight: 400;
                                font-style: normal;
                                color: #999999;
                                text-decoration: none;
                                letter-spacing: 0;
                              "
                            ></td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 10px;
                                height: 10px;
                                line-height: 10px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#4B7BEC"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 32px;
                                height: 32px;
                                line-height: 32px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="45"
                              align="center"
                              valign="middle"
                              class="autoheight"
                            >
                              <a
                                href="http://example.com"
                                style="text-decoration: none; border: 0px"
                                ><img
                                  src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png"
                                  width="230"
                                  border="0"
                                  alt="logo"
                                  style="
                                    width: 230px;
                                    border: 0px;
                                    display: inline-block !important;
                                  "
                              /></a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 17px;
                                height: 17px;
                                line-height: 17px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#4B7BEC"
                  style="background-color: #e17e1d"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="br-mobile-none"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #ffffff;
                                font-size: 38px;
                                line-height: 48px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding: 0px;
                                padding-bottom: 30px;
                              "
                            >
                              Your Booking Is Confirmed!
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#4B7BEC"
                  style="background-color: #e17e1d"
                >
                  <table
                    border="0"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    style="width: 100%; max-width: 100%"
                  >
                    <tr>
                      <td align="center">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="img-responsive"
                            >
                              <img
                                src="https://vacationsaga.b-cdn.net/assets/tick.webp"
                                border="0"
                                width="600"
                                alt="Header"
                                style="
                                  display: inline-block !important;
                                  border: 0;
                                  width: 300px;
                                  max-width: 600px;
                                  border-radius: 100%;
                                  mix-blend-mode: multiply;
                                "
                              />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #191919;
                                font-size: 18px;
                                line-height: 28px;
                                font-weight: 600;
                                letter-spacing: 0px;
                                padding: 0px;
                                padding-bottom: 20px;
                              "
                            >
                              Hello ${travellerName},
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 16px;
                                line-height: 26px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding: 0px;
                              "
                            >
                              Your Booking Request is confirmed by the owner, You can now pay the platform fees to confirm your booking
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="250"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 250px; max-width: 250px"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    Booking Request ID :
                                    <span
                                      style="
                                        font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 28px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                      "
                                    >
                                      ${bookingId}</span
                                    >
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="20"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 20px; max-width: 20px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="250"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 250px; max-width: 250px"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                      padding: 0px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    Booking Status :
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="middle">
                                    <table
                                      border="0"
                                      align="left"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="center-float"
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          valign="middle"
                                          style="
                                            background-color: #ffffff;
                                            color: #13e00c;
                                            font-family: 'Poppins', sans-serif;
                                            font-size: 16px;
                                            line-height: 26px;
                                            font-weight: 400;
                                            letter-spacing: 0px;
                                            padding: 5px 10px 5px 10px;
                                            border-radius: 4px;
                                          "
                                        >
                                          Confirmed By Owner
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #595959;
                                      font-size: 16px;
                                      line-height: 26px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                    "
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="20"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 20px; max-width: 20px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 0px;
                                height: 0px;
                                line-height: 0px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="100"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 100px; max-width: 100px"
                              >
                                <tbody></tbody>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="20"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 20px; max-width: 20px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="300"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 300px; max-width: 300px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    class="autoheight"
                                    height="10"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                      padding: 0px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    Check In Date
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="10"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 10px; max-width: 10px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="10"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="90"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 90px; max-width: 90px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    class="autoheight"
                                    height="10"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    align="right"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 20px;
                                      line-height: 30px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    ${
                                      new Date(startDate)
                                        .toLocaleDateString()
                                        .split("T")[0]
                                    }
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="100"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 100px; max-width: 100px"
                              >
                                <tbody></tbody>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="20"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 20px; max-width: 20px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="300"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 300px; max-width: 300px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    class="autoheight"
                                    height="10"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                      padding: 0px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    Check Out Date
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="10"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 10px; max-width: 10px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="10"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="90"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 90px; max-width: 90px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    class="autoheight"
                                    height="10"
                                  ></td>
                                </tr>
                                <tr>
                                  <td
                                    align="right"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 20px;
                                      line-height: 30px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    ${
                                      new Date(endDate)
                                        .toLocaleDateString()
                                        .split("T")[0]
                                    }
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    width="520"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="255"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 255px; max-width: 255px"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 22px;
                                      line-height: 32px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    Estimated Rent&nbsp;
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="10"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 10px; max-width: 10px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="10"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="255"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 255px; max-width: 255px"
                              >
                                <tr>
                                  <td
                                    align="right"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 22px;
                                      line-height: 32px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    €${price}
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 20px;
                                height: 20px;
                                line-height: 20px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 20px;
                                height: 20px;
                                line-height: 20px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <table
                                border="0"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tr>
                                  <td
                                    align="center"
                                    style="
                                      background-color: transparent;
                                      display: block;
                                      border-radius: 4px;
                                      border-color: #e17e1d;
                                      border-width: 2px;
                                      border-style: solid;
                                    "
                                  >
                                    <a
                                      href="www.vacationsaga.com/payment?pId=${propertyId}&amount=6&paymentToken=${paymentToken}&bookingId=${bookingId}"
                                      style="
                                        color: #e17e1d;
                                        font-family: Poppins, sans-serif;
                                        font-size: 14px;
                                        font-weight: 600;
                                        letter-spacing: 0.5px;
                                        line-height: 24px;
                                        display: block;
                                        padding: 16px 60px;
                                        text-decoration: none;
                                        white-space: nowrap;
                                      "
                                      >Pay for Booking</a
                                    >
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#F1F1F1"
                  style="background-color: #f1f1f1"
                >
                  <table
                    width="520"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 40px;
                                height: 40px;
                                line-height: 40px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              style="padding: 0; padding-bottom: 20px"
                            >
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="center"
                                class="center-float"
                                style="
                                  border: 0;
                                  border-collapse: collapse;
                                  border-spacing: 0;
                                "
                              >
                                <tr></tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="br-mobile-none"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 14px;
                                line-height: 24px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding: 0;
                                padding-bottom: 20px;
                              "
                            >
                              Regards, Vacation Saga
                            </td>
                          </tr>

                          <tr>
                            <td align="center" valign="middle">
                              <a
                                href="http://example.com"
                                style="text-decoration: none; border: 0px"
                                ><img
                                  src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png"
                                  width="40"
                                  border="0"
                                  alt="logo"
                                  style="
                                    width: 40px;
                                    border: 0px;
                                    display: inline !important;
                                  "
                              /></a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 40px;
                                height: 40px;
                                line-height: 40px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
};

export const DetailsExchangeTemplate = (owner, traveller, bookingId) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!--[if (gte mso 9)|(IE)
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:AllowPNG /><o:PixelsPerInch
            >96</o:PixelsPerInch
          ></o:OfficeDocumentSettings
        ></xml
      ><!
    [endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />
    <title>Booking Confirmation Email</title>
    <style type="text/css">
      body {
        margin: 0px !important;
        padding: 0px !important;
        display: block !important;
        min-width: 100% !important;
        width: 100% !important;
        -webkit-text-size-adjust: none;
        word-break: break-word;
      }
      table {
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      table td {
        border-collapse: collapse;
      }
      strong {
        font-weight: bold !important;
      }
      td img {
        -ms-interpolation-mode: bicubic;
        display: block;
        width: auto;
        max-width: auto;
        height: auto;
        margin: auto;
        display: block !important;
        border: 0px !important;
      }
      td p {
        margin: 0 !important;
        padding: 0 !important;
        display: inline-block !important;
        font-family: inherit !important;
      }
      td a {
        text-decoration: none !important;
      }
      table.hide-desktop,
      tr.hide-desktop,
      td.hide-desktop,
      br.hide-desktop {
        display: none !important;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: inherit;
      }
      .ReadMsgBody {
        width: 100%;
        background-color: #ffffff;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      .undoreset a,
      .undoreset a:hover {
        text-decoration: none !important;
      }
      .yshortcuts a {
        border-bottom: none !important;
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: none;
      }
      .star:hover a,
      .star:hover ~ .star a {
        color: #ffcf0f !important;
      }
    </style>
    <style type="text/css">
      @font-face {
        font-family: "Poppins";
        font-style: italic;
        font-weight: 400;
        src: local("Poppins Italic"), local("Poppins-Italic"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiGyp8kv8JHgFVrJJLucHtA.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: italic;
        font-weight: 600;
        src: local("Poppins SemiBold Italic"), local("Poppins-SemiBoldItalic"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        src: local("Poppins Regular"), local("Poppins-Regular"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiEyp8kv8JHgFVrJJfecg.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        src: local("Poppins SemiBold"), local("Poppins-SemiBold"),
          url(https://fonts.gstatic.com/s/poppins/v9/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2)
            format("woff2");
      }
    </style>
    <style type="text/css">
      @font-face {
        font-family: "Lora";
        font-style: italic;
        font-weight: 400;
        src: local("Lora Italic"), local("Lora-Italic"),
          url(https://fonts.gstatic.com/s/lora/v14/0QIhMX1D_JOuMw_LIftL.woff2)
            format("woff2");
      }
      @font-face {
        font-family: "Lora";
        font-style: normal;
        font-weight: 400;
        src: local("Lora Regular"), local("Lora-Regular"),
          url(https://fonts.gstatic.com/s/lora/v14/0QIvMX1D_JOuMwr7Iw.woff2)
            format("woff2");
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 600px) {
        td.img-responsive img {
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          margin: auto;
        }
        table.row {
          width: 100% !important;
          max-width: 100% !important;
        }
        table.left-float,
        td.left-float {
          float: left !important;
        }
        table.center-float,
        td.center-float {
          float: none !important;
        }
        table.right-float,
        td.right-float {
          float: right !important;
        }
        td.left-text {
          text-align: left !important;
        }
        td.center-text {
          text-align: center !important;
        }
        td.right-text {
          text-align: right !important;
        }
        td.container-padding {
          width: 100% !important;
          padding-left: 15px !important;
          padding-right: 15px !important;
        }
        table.hide-mobile,
        tr.hide-mobile,
        td.hide-mobile,
        br.hide-mobile {
          display: none !important;
        }
        table.hide-desktop,
        tr.hide-desktop,
        td.hide-desktop,
        br.hide-desktop {
          display: block !important;
        }
        td.menu-container {
          text-align: center !important;
        }
        td.autoheight {
          height: auto !important;
        }
        table.mobile-padding {
          margin: 15px 0 !important;
        }
        td.br-mobile-none br {
          display: none !important;
        }
      }
    </style>
  </head>
  <body
    style="
      mso-line-height-rule: exactly;
      word-break: break-word;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    "
    width="100%"
  >
    <center>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#F1F1F1"
                  style="background-color: #f1f1f1"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 10px;
                                height: 10px;
                                line-height: 10px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="right"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Lora', serif;
                                font-size: 12px;
                                line-height: 22px;
                                font-weight: 400;
                                font-style: normal;
                                color: #999999;
                                text-decoration: none;
                                letter-spacing: 0;
                              "
                            ></td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 10px;
                                height: 10px;
                                line-height: 10px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#4B7BEC"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 32px;
                                height: 32px;
                                line-height: 32px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              height="45"
                              align="center"
                              valign="middle"
                              class="autoheight"
                            >
                              <a
                                href="http://example.com"
                                style="text-decoration: none; border: 0px"
                                ><img
                                  src="https://editor.maool.com/images/uploads/644815/1677742438-Asset_16@72x.png"
                                  width="230"
                                  border="0"
                                  alt="logo"
                                  style="
                                    width: 230px;
                                    border: 0px;
                                    display: inline-block !important;
                                  "
                              /></a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 17px;
                                height: 17px;
                                line-height: 17px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#4B7BEC"
                  style="background-color: #e17e1d"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="br-mobile-none"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #ffffff;
                                font-size: 34px;
                                line-height: 48px;
                                font-weight: 500;
                                letter-spacing: 0px;
                                padding: 0px;
                                padding-bottom: 30px;
                              "
                            >
                              Details of Owner and Traveller
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td align="center">
                  <table
                    border="0"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    style="width: 100%; max-width: 100%"
                  >
                    <tr>
                      <td align="center">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                    			style="width: 100%; max-width: 100%; margin-top: -50px; background-color:#e17e1d; padding: 10px;"
                        >
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="img-responsive"
                            >
                              <img
                                src="https://vacationsaga.b-cdn.net/assets/exchange.png"
                                border="0"
                                width="600"
                                alt="Header"
                                style="
                                  display: inline-block !important;
                                  border: 0;
                                  width: 150px;
                                  max-width: 600px;
                                  /* border-radius: 100%; */
                                  mix-blend-mode: multiply;
                                  margin-top: 20px;
                                "
                              />
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 30px;
                                height: 30px;
                                line-height: 30px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #191919;
                                font-size: 18px;
                                line-height: 28px;
                                font-weight: 600;
                                letter-spacing: 0px;
                                padding: 0px;
                                padding-bottom: 20px;
                              "
                            >
                              Hello,
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              class="center-text"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 16px;
                                line-height: 26px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding: 0px;
                              "
                            >
                              This email is meant to exchange personal details
                              among each other i.e owner of the property and the
                              traveller. Through these details you can both
                              contact directly to each other and can further
                              with the formalties.
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="250"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 250px; max-width: 250px"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                    "
                                  >
                                    Booking Request ID :
                                    <span
                                      style="
                                        font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 28px;
                                        font-weight: 400;
                                        letter-spacing: 0px;
                                      "
                                    >
                                      ${bookingId}</span
                                    >
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="20"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 20px; max-width: 20px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="20"
                                  ></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="250"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 250px; max-width: 250px"
                              >
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                      padding: 0px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    Owner Details :
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="middle">
                                    <table
                                      border="0"
                                      align="left"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="center-float"
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          valign="middle"
                                          style="
                                            background-color: #fff6d6;
                                            color: black;
                                            font-family: 'Poppins', sans-serif;
                                            font-size: 16px;
                                            line-height: 26px;
                                            font-weight: 400;
                                            letter-spacing: 0px;
                                            padding: 0px 10px 0 10px;
                                            border-radius: 4px;
                                          "
                                        >
                                          Name - ${owner.name} <br>
																					Email - ${owner.email} <br>
																					Phone - ${owner.phone} <br>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      font-size: 15px;
                                      height: 15px;
                                      line-height: 15px;
                                    "
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                              </tr>
                                <tr>
                                  <td
                                    align="left"
                                    valign="middle"
                                    class="center-text"
                                    style="
                                      font-family: 'Poppins', sans-serif;
                                      color: #191919;
                                      font-size: 18px;
                                      line-height: 28px;
                                      font-weight: 600;
                                      letter-spacing: 0px;
                                      padding: 0px;
                                      padding-bottom: 5px;
                                    "
                                  >
                                    Traveller Details :
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="middle">
                                    <table
                                      border="0"
                                      align="left"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="center-float"
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          valign="middle"
                                          style="
                                            background-color: #fff6d6;
                                            color: black;
                                            font-family: 'Poppins', sans-serif;
                                            font-size: 16px;
                                            line-height: 26px;
                                            font-weight: 400;
                                            letter-spacing: 0px;
                                            padding: 0px 10px 0 10px;
                                            border-radius: 4px;
                                          "
                                        >
                                          Name - ${traveller.name} <br>
																					Email - ${traveller.email} <br>
																					Phone -${traveller.phone} <br>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                            </td>
                          </tr>
                      
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    border="0"
                    width="520"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                background-color: #f1f1f1;
                                font-size: 1px;
                                height: 1px;
                                line-height: 1px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#FFFFFF"
                  style="background-color: #ffffff"
                >
                  <table
                    width="520"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          align="center"
                          style="width: 100%; max-width: 100%"
                        >
                          <tr>
                            <td
                              style="
                                font-size: 15px;
                                height: 15px;
                                line-height: 15px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <!--[if (gte mso 9)|(IE)]><table border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
                              <table
                                width="255"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 255px; max-width: 255px"
                              >
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="10"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 10px; max-width: 10px"
                              >
                                <tr>
                                  <td
                                    valign="middle"
                                    align="center"
                                    height="10"
                                  ></td>
                                </tr>
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td><td><![endif]-->
                              <table
                                width="255"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="row"
                                style="width: 255px; max-width: 255px"
                              >
                              </table>
                              <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                            </td>
                          </tr>
          
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <table
        border="0"
        width="100%"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="width: 100%; max-width: 100%"
      >
        <tr>
          <td
            align="center"
            valign="middle"
            bgcolor="#F1F1F1"
            style="background-color: #f1f1f1"
          >
            <table
              border="0"
              width="600"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="row"
              style="width: 600px; max-width: 600px"
            >
              <tr>
                <td
                  align="center"
                  bgcolor="#F1F1F1"
                  style="background-color: #f1f1f1"
                >
                  <table
                    width="520"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    class="row"
                    style="width: 520px; max-width: 520px"
                  >
                    <tr>
                      <td align="center" class="container-padding">
                        <table
                          border="0"
                          width="100%"
                          cellpadding="0"
                          cellspacing="0"
                          <tr>
                            <td
                              align="center"
                              valign="middle"
                              class="br-mobile-none"
                              style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 14px;
                                line-height: 24px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                padding: 0;
                                padding-bottom: 20px;
                              "
                            >
                              Regards, Vacation Saga
                            </td>
                          </tr>

                          <tr>
                            <td align="center" valign="middle">
                              <a
                                href="http://example.com"
                                style="text-decoration: none; border: 0px"
                                ><img
                                  src="https://editor.maool.com/images/uploads/644815/1677742252-vacation_saga_logo.png"
                                  width="40"
                                  border="0"
                                  alt="logo"
                                  style="
                                    width: 40px;
                                    border: 0px;
                                    display: inline !important;
                                  "
                              /></a>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-size: 40px;
                                height: 40px;
                                line-height: 40px;
                              "
                            >
                              &nbsp;
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
};
